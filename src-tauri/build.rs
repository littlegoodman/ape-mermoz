fn main() {
    // Add camera permissions for macOS
    #[cfg(target_os = "macOS")]
    {
        use std::path::PathBuf;
        if PathBuf::from("Info.plist").exists() {
            std::env::set_var("TAURI_BUNDLE_INFO_PLIST_PATH", "Info.plist");
        }
    }
    tauri_build::build()
}
