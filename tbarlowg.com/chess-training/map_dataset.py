import argparse
import numpy as np
import pandas as pd
import pyarrow.parquet as pq
import torch
import torch.nn as nn
import torch.optim as optim
import torch.onnx
from util import fen_to_input

class ChessNet(nn.Module):
    def __init__(self):
        super(ChessNet, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(773, 512),
            nn.ReLU(),
            nn.Linear(512, 128),
            nn.ReLU(),
            nn.Linear(128, 1),
            nn.Tanh() # Squashes output between -1 and 1
        )

    def forward(self, x):
        return self.network(x)

def parse_target(cp: float, mate: float) -> float:
    if not pd.isna(mate):
        return 1.0 if mate > 0 else -1.0
    if not pd.isna(cp):
        return max(-1.0, min(1.0, cp / 1000.0))
    return 0.0

parser = argparse.ArgumentParser()
parser.add_argument('-i', '--input-data', type=str, required=True)
parser.add_argument('-e', '--epochs', type=int, default=1)
parser.add_argument('-b', '--batch-size', type=int, default=4096)
args = parser.parse_args()

# Check for Apple Silicon GPU (MPS)
device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
print(f"Using device: {device}")

# Initialize Model, Loss, and Optimizer
model = ChessNet().to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

pf = pq.ParquetFile(args.input_data)
model.train() # Set model to training mode
for epoch in range(args.epochs):
    print(f"\n--- Starting Epoch {epoch + 1} ---")
    batch_num = 0

    for batch in pf.iter_batches(batch_size=args.batch_size):
        df = batch.to_pandas()

        # Data Prep
        X_list = [fen_to_input(fen) for fen in df['fen']]
        y_list = [parse_target(c, m) for c, m in zip(df['cp'], df['mate'])]

        # Convert to Tensors and move to GPU
        X_tensor = torch.tensor(np.array(X_list), dtype=torch.float32).to(device)
        y_tensor = torch.tensor(np.array(y_list), dtype=torch.float32).to(device).view(-1, 1)

        # Optimization Step
        optimizer.zero_grad()           # Clear old gradients
        outputs = model(X_tensor)       # Forward pass
        loss = criterion(outputs, y_tensor) # Calculate loss
        loss.backward()                 # Backward pass (compute gradients)
        optimizer.step()                # Update weights

        batch_num += 1
        if batch_num % 10 == 0:
            print(f"Epoch [{epoch+1}/{args.epochs}], Batch [{batch_num}], Loss: {loss.item():.4f}")

# --- 4. SAVE MODEL ---
torch.save(model.state_dict(), "chess_model.pth")
print("\nTraining complete! Model weights saved to chess_model.pth")



# 1. Put the model in evaluation mode (disables dropout/batchnorm updates if you had them)
model.eval()

# 2. Create a dummy input matching your expected shape: [Batch Size, Number of Features]
# Our network expects 773 inputs.
dummy_input = torch.randn(1, 773, device=device)

# 3. Export the model to ONNX
onnx_file_path = "chess_model.onnx"
torch.onnx.export(
    model,                      # The trained model
    dummy_input,                # The dummy input tensor
    onnx_file_path,             # Where to save it
    export_params=True,         # Store the trained weights
    opset_version=14,           # A stable ONNX version
    do_constant_folding=True,   # Optimize the model for faster inference
    input_names=['board_state'], # Name the input for the TS side
    output_names=['evaluation'], # Name the output for the TS side
    dynamic_axes={              # Allow variable batch sizes later
        'board_state': {0: 'batch_size'},
        'evaluation': {0: 'batch_size'}
    }
)

print(f"\nWeb export complete! Saved as {onnx_file_path}")
