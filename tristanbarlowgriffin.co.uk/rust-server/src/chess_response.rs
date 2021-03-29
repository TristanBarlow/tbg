use serde_derive::{Deserialize, Serialize};

#[derive(Deserialize, Serialize)]
pub struct ChessResponse {
    pub id: String,
    pub success: bool,
    pub value: String,
}
