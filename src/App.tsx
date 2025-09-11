import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

interface Contact {
  name: string;
  phone: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchChocolateCommands() {
    setLoading(true);
    try {
      const result = await invoke<Contact[]>("find_chocolate_commands");
      setContacts(result);
    } catch (error) {
      console.error("Error fetching chocolate commands:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="row">
        <button onClick={fetchChocolateCommands} disabled={loading}>
          {loading ? "Loading..." : "Find Chocolate Commands"}
        </button>
      </div>

      {contacts.length > 0 && (
        <div className="contacts-table">
          <h2>Chocolate Command Contacts</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default App;
