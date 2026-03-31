use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::process::Command;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Instance {
    pub id: String,
    pub name: String,
    pub channel: String,
    pub model: String,
    pub status: String,
    pub pid: Option<u32>,
    pub port: Option<u16>,
    pub created_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CreateInstanceRequest {
    pub name: String,
    pub channel: String,
    pub model: String,
    pub api_key: String,
    pub channel_config: HashMap<String, String>,
}

fn instances_dir() -> PathBuf {
    let dir = dirs::config_dir()
        .unwrap_or_else(|| PathBuf::from("."))
        .join("kclaw-manager")
        .join("instances");
    fs::create_dir_all(&dir).ok();
    dir
}

fn load_instances() -> Vec<Instance> {
    let path = instances_dir().join("instances.json");
    if path.exists() {
        let content = fs::read_to_string(&path).unwrap_or_default();
        serde_json::from_str(&content).unwrap_or_default()
    } else {
        vec![]
    }
}

fn save_instances(instances: &[Instance]) -> Result<(), String> {
    let path = instances_dir().join("instances.json");
    let content = serde_json::to_string_pretty(instances).map_err(|e| e.to_string())?;
    fs::write(&path, content).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn get_instances() -> Result<Vec<Instance>, String> {
    Ok(load_instances())
}

#[tauri::command]
pub fn create_instance(request: CreateInstanceRequest) -> Result<Instance, String> {
    let mut instances = load_instances();
    let id = format!("inst-{}", chrono_id());

    let instance = Instance {
        id: id.clone(),
        name: request.name,
        channel: request.channel,
        model: request.model,
        status: "stopped".to_string(),
        pid: None,
        port: None,
        created_at: current_timestamp(),
    };

    instances.push(instance.clone());
    save_instances(&instances)?;
    Ok(instance)
}

#[tauri::command]
pub fn delete_instance(id: String) -> Result<(), String> {
    let mut instances = load_instances();
    if let Some(inst) = instances.iter().find(|i| i.id == id) {
        if inst.status == "running" {
            if let Some(pid) = inst.pid {
                kill_process(pid);
            }
        }
    }
    instances.retain(|i| i.id != id);
    save_instances(&instances)
}

#[tauri::command]
pub fn start_instance(id: String) -> Result<Instance, String> {
    let mut instances = load_instances();
    if let Some(inst) = instances.iter_mut().find(|i| i.id == id) {
        inst.status = "running".to_string();
        save_instances(&instances)?;
        Ok(inst.clone())
    } else {
        Err("Instance not found".to_string())
    }
}

#[tauri::command]
pub fn stop_instance(id: String) -> Result<Instance, String> {
    let mut instances = load_instances();
    if let Some(inst) = instances.iter_mut().find(|i| i.id == id) {
        if let Some(pid) = inst.pid {
            kill_process(pid);
        }
        inst.status = "stopped".to_string();
        inst.pid = None;
        save_instances(&instances)?;
        Ok(inst.clone())
    } else {
        Err("Instance not found".to_string())
    }
}

#[tauri::command]
pub fn restart_instance(id: String) -> Result<Instance, String> {
    stop_instance(id.clone())?;
    start_instance(id)
}

fn kill_process(pid: u32) {
    #[cfg(target_os = "windows")]
    {
        Command::new("taskkill")
            .args(["/F", "/PID", &pid.to_string()])
            .output()
            .ok();
    }
    #[cfg(not(target_os = "windows"))]
    {
        Command::new("kill")
            .args(["-9", &pid.to_string()])
            .output()
            .ok();
    }
}

fn chrono_id() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let dur = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default();
    format!("{:x}", dur.as_millis())
}

fn current_timestamp() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let dur = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default();
    format!("{}", dur.as_secs())
}
