import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

import "./App.css";
import { TeachersPage } from "./app/teachers/views/teachers.page";
import NiceModal from "@ebay/nice-modal-react";

function App() {
  return (
    <main className="container">
      <NiceModal.Provider>
        <div className="row">
          <h1>Teachers</h1>
          <TeachersPage />
        </div>
      </NiceModal.Provider>
    </main>
  );
}

export default App;
