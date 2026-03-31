use serde::Serialize;
use std::process::Command;

#[derive(Debug, Serialize)]
pub struct HealthStatus {
    pub openclaw_installed: bool,
    pub openclaw_version: Option<String>,
    pub node_installed: bool,
    pub node_version: Option<String>,
    pub api_reachable: bool,
}

#[derive(Debug, Serialize)]
pub struct SystemInfo {
    pub os: String,
    pub arch: String,
    pub hostname: String,
    pub memory_total_mb: u64,
}

#[tauri::command]
pub fn check_health() -> Result<HealthStatus, String> {
    let (openclaw_installed, openclaw_version) = check_command("openclaw", &["--version"]);
    let (node_installed, node_version) = check_command("node", &["--version"]);

    Ok(HealthStatus {
        openclaw_installed,
        openclaw_version,
        node_installed,
        node_version,
        api_reachable: false,
    })
}

#[tauri::command]
pub fn get_system_info() -> Result<SystemInfo, String> {
    Ok(SystemInfo {
        os: std::env::consts::OS.to_string(),
        arch: std::env::consts::ARCH.to_string(),
        hostname: hostname::get()
            .map(|h| h.to_string_lossy().to_string())
            .unwrap_or_else(|_| "unknown".to_string()),
        memory_total_mb: 0,
    })
}

fn check_command(cmd: &str, args: &[&str]) -> (bool, Option<String>) {
    match Command::new(cmd).args(args).output() {
        Ok(output) if output.status.success() => {
            let version = String::from_utf8_lossy(&output.stdout).trim().to_string();
            (true, Some(version))
        }
        _ => (false, None),
    }
}
