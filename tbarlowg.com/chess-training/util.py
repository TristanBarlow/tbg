
# Input shape is 8 x 8 (for tiles) x 6 (pieces) x 2 (white/black) + 4 (white/black can King or queen side castle)
INPUT_SIZE = (8 * 8 * 6 * 2) + 4
def fen_to_input(fen: str):
    nn_input = [0] * INPUT_SIZE
    parts = fen.split(' ')
    board_part = parts[0]
    # set castle state
    if len(parts) > 1:
        castle_state = parts[2]
        if "K" in castle_state:
            castle_state[0] = 1
        if "Q" in castle_state:
            castle_state[1] = 1
        if "k" in castle_state:
            castle_state[2] = 1
        if "q" in castle_state:
            castle_state[3] = 1

    #start at 4 as the first four values are for if we can castle
    start_index = 4
    for row in board_part('/'):
        brow = []
        for c in row:
            if c == ' ':
                break
            elif c in '12345678':
                brow.extend( ['--'] * int(c) )
            elif c == 'p':
                brow.append( 'bp' )
            elif c == 'P':
                brow.append( 'wp' )
            elif c > 'Z':
                brow.append( 'b'+c.upper() )
            else:
                brow.append( 'w'+c )

        nn_input.append( brow )
    return nn_input
