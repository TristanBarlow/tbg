use crate::chess_response::ChessResponse;
use chess::{Board, MoveGen};

pub fn get_move(board: Board) -> ChessResponse {
    let mut moves_ops = MoveGen::new_legal(&board);

    let response: ChessResponse;

    let m = moves_ops.next();
    match m {
        Some(moves) => {
            response = ChessResponse {
                id: String::from("1"),
                success: true,
                value: moves.to_string(),
            }
        }
        _ => {
            response = ChessResponse {
                id: String::from("1"),
                success: false,
                value: String::from("No moves ready"),
            }
        }
    }

    return response;
}
