# 8x8 for tiles, 12 for pieces, 4 for castling, 1 for whose turn = 773 total nodes
PIECE_SIZE = 6 * 2
ROW_SIZE = 8 * PIECE_SIZE
INPUT_SIZE = (8 * ROW_SIZE) + 4 + 1

import numpy as np

PIECE_MAP = {
    'P': 0, 'p': 1, 'N': 2, 'n': 3, 'R': 4, 'r': 5,
    'B': 6, 'b': 7, 'Q': 8, 'q': 9, 'K': 10, 'k': 11
}

def fen_to_input(fen: str) -> np.ndarray:
    nn_input = np.zeros(INPUT_SIZE, dtype=np.float32)
    parts = fen.split(' ')

    if len(parts) > 1 and parts[1] == 'w':
        nn_input[0] = 1.0

    if len(parts) > 2:
        castle_state = parts[2]
        if "K" in castle_state: nn_input[1] = 1.0
        if "Q" in castle_state: nn_input[2] = 1.0
        if "k" in castle_state: nn_input[3] = 1.0
        if "q" in castle_state: nn_input[4] = 1.0

    offset = 5
    board_part = parts[0]

    for row in board_part.split('/'):
        col = 0
        for c in row:
            if c.isdigit():
                col += int(c)
            else:
                nn_input[offset + (col * PIECE_SIZE) + PIECE_MAP[c]] = 1.0
                col += 1

        offset += ROW_SIZE

    return nn_input
