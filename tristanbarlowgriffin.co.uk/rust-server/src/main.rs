mod chess_response;
pub use chess_response::*;

mod minmax;

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
    let log = warp::log("chess::api");
    let cors = warp::cors()
        .allow_any_origin()
        .allow_headers(vec![
            "Access-Control-Request-Headers",
            "Access-Control-Request-Method",
            "Access-Control-Allow-Origin",
            "User-Agent",
            "Sec-Fetch-Mode",
            "content-type",
            "Referrer",
            "Origin",
        ])
        .allow_methods(vec![Method::GET, Method::POST, Method::DELETE]);

    let hello_route = warp::get().and(warp::path("chess")).map(|| {
        println!("got a /just-ok request!");
        let our_ids = vec![1, 3, 7, 13];
        return warp::reply::json(&our_ids);
    });

    // POST /employees/:rate  {"name":"Sean","rate":2}
    let move_route = warp::post()
        .and(warp::path!("chess" / String / "move"))
        .and(warp::body::json())
        .map(|chess_id: String, msg: ChessMessage| {
            println!(
                "Got message chessId: {} ID: {}, FEN: {}",
                chess_id, msg.id, msg.fen
            );
            let board_op = Board::from_str(msg.fen.as_str());
            let response: ChessResponse;
            match board_op {
                Err(e) => {
                    response = ChessResponse {
                        id: msg.id,
                        success: false,
                        value: format!("Could not decode Fen: {}", e),
                    };

                    return warp::reply::json(&response);
                }
                Ok(board) => {
                    response = minmax::get_move(msg.id.clone(), &board);
                }
            }
            return warp::reply::json(&response);
        });

    let not_found = warp::any()
        .map(|| warp::reply::with_status("Not found", warp::http::StatusCode::NOT_FOUND));
    let router = move_route
        .or(hello_route)
        .or(not_found)
        .with(cors)
        .with(log);
    warp::serve(router).run(([127, 0, 0, 1], 3030)).await
}
