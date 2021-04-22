use std::ptr::null;

use crate::chess_response::ChessResponse;
use chess::{Board, ChessMove, MoveGen};
use rand::random;

// fn new_layer(board: Board) -> Option<String> {
//     let mut moves_ops = MoveGen::new_legal(&board).into_iter();
//     let m = moves_ops.next();
// }

struct LayerResult {
    best_move: ChessMove,
    score: f64,
}

const MAX_DEPT: u8 = 4;
fn new_layer(board: Board, is_player_move: bool, depth: u8) -> Option<LayerResult> {
    let mut m = MoveGen::new_legal(&board);

    let mut best_result: Option<LayerResult> = None;
    for chess_move in m {
        let mut new_board = Board::default();
        board.make_move(chess_move, &mut new_board);

        let result_op = new_layer(new_board, !is_player_move, depth + 1);
        if let Some(result) = result_op {
            match &best_result {
                Some(res) => {
                    if res.score > result.score {
                        best_result = Option::from(result)
                    }
                }
                None => best_result = Option::from(result),
            }
        }
    }
    return best_result;
}

pub fn get_move(move_id: String, board: &Board) -> ChessResponse {
    let best_result = new_layer(board.clone(), true, 1);

    if let Some(best) = best_result {
        return ChessResponse {
            id: move_id,
            success: true,
            value: best.best_move.to_string(),
        };
    }
    ChessResponse {
        id: move_id,
        success: false,
        value: String::from("No move found"),
    }
}
