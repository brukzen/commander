use serde::Serialize;
use std::path::PathBuf;
use ts_rs::TS;

#[derive(Serialize, TS)]
#[ts(export)]
pub struct ApplicationResponse {
    pub display_name: String,
    pub icon: String,
    pub path: PathBuf,
}
