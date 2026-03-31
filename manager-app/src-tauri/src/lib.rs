mod commands;

use commands::{
    config::{get_config, save_config},
    service::{
        create_instance, delete_instance, get_instances, restart_instance, start_instance,
        stop_instance,
    },
    diagnostics::{check_health, get_system_info},
};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            get_config,
            save_config,
            get_instances,
            create_instance,
            delete_instance,
            start_instance,
            stop_instance,
            restart_instance,
            check_health,
            get_system_info,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
