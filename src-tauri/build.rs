fn main() {
    // Add camera permissions for macOS // TODO verify
    #[cfg(target_os = "macos")]
    {
        use std::path::PathBuf;
        if PathBuf::from("Info.plist").exists() {
            std::env::set_var("TAURI_BUNDLE_INFO_PLIST_PATH", "Info.plist");
        }
    }
    tauri_build::build()
}
