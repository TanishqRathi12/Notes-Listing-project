import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";

interface Note {
  id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const userResponse = await fetch("/api/user");
        const userData = await userResponse.json();
        setUser(userData);


        const notesResponse = await fetch("/api/notes");
        const notesData = await notesResponse.json();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });


      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">
          <img src="/images/icon.png" alt="Logo" />
          <span className="logo-text">Dashboard</span>
        </div>
        <span className="sign-out" onClick={() => navigate("/")}>
          Sign Out
        </span>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Welcome</h2>
          {user && (
            <p>
              {user.name} ({user.email})
            </p>
          )}
        </section>

        <section className="notes-section">
          <div className="notes-header">
            <h3>Your Notes</h3>
            <button
              className="create-note-button"
              onClick={() => navigate("/create")}
            >
              Create Note
            </button>
          </div>

          <div className="notes-container">
            {notes.map((note) => (
              <div className="note-card" key={note.id}>
                <p>{note.content}</p>
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(note.id)}
                >
                  🗑️
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
