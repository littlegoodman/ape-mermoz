import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Database from "@tauri-apps/plugin-sql";

import "./App.css";
import { TeachersPage } from "./app/teachers/views/teachers.page";

function App() {
  return (
    <main className="container">
      <div className="row">
        <TeachersPage />
      </div>
    </main>
  );
}

export default App;
