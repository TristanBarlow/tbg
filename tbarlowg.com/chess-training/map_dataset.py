import tensorflow as tf
import argparse
import numpy as np
import pandas as pd

from pyarrow.parquet import ParquetFile
import pyarrow as pa

from util import fen_to_input

parser = argparse.ArgumentParser()
#https://huggingface.co/datasets/Lichess/chess-position-evaluations/tree/main
parser.add_argument('-i', '--input-data', type=str,
                    help='Path to parequet training data')

args = parser.parse_args()
print(args.input_data)

pf = ParquetFile(args.input_data)
first_ten_rows = next(pf.iter_batches(batch_size = 10000))
df = pa.Table.from_batches([first_ten_rows]).to_pandas()

# Source - https://stackoverflow.com/a
# Posted by Tim Roberts
# Retrieved 2026-01-10, License - CC BY-SA 4.0

fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

print(fen_to_input(fen))
