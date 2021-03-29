mod chess_response;
pub use chess_response::*;

mod tree_search;
pub use tree_search::*;

use chess::{Board, MoveGen};
use chess_response::ChessResponse;
use serde_derive::{Deserialize, Serialize};
use std::str::FromStr;
use warp::{hyper::Method, Filter};

#[derive(Deserialize, Serialize)]
struct ChessMessage {
    id: String,
    fen: String,
}

#[tokio::main]
async fn main() {
    pretty_env_logger::init();

    let cors = warp::cors()
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE])
        .allow_headers(vec![
            "Access-Control-Request-Headers",
            "Access-Control-Request-Method",
            "User-Agent",
            "Sec-Fetch-Mode",
            "content-type",
            "Referer",
            "Origin",
        ])
        .allow_any_origin();

    // POST /employees/:rate  {"name":"Sean","rate":2}
    let move_route = warp::post()
        .and(warp::path!("chess" / "move"))
        .and(warp::body::json())
        .map(|msg: ChessMessage| {
            println!("Got message ID: {}, FEN: {}", msg.id, msg.fen);
            let board_op = Board::from_str(msg.fen.as_str());
            let err_response: ChessResponse;
            match board_op {
                Err(e) => {
                    err_response = ChessResponse {
                        id: msg.id,
                        success: false,
                        value: format!("Could not decode Fen: {}", e),
                    };

                    return warp::reply::json(&err_response);
                }
                Ok(board) => {
                    err_response = get_move(board);
                }
            }
            return warp::reply::json(&err_response);
        });
    let router = move_route.with(cors);
    warp::serve(router).run(([127, 0, 0, 1], 3030)).await
}
