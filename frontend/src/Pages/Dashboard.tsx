import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Dashboard.css";
import axios from "../Axios/Axios.ts";

interface Note {
  note: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); 
      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        const userResponse = await axios.get("/notes/getNotes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = userResponse.data;
        setUser(userData);
        setNotes(userData.notes);
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/login"); 
      }
    };
  
    fetchData();
  }, [user]); 

  const handleDelete = async (note: string) => {
    try {
      if (token){
      await axios.delete(`/notes/deleteNote`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { note },
      });
    }
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
          <h2>Welcome, {user?.name}!</h2>
          {user && (
            <p>Email:({user.email})
            </p>
          )}
        </section>

        <section className="notes-section">
          <div className="notes-header">
            <button
              className="create-note-button"
              onClick={() => navigate("/create")}
            >
              Create Note
            </button>
          </div>
          <h3 id="Notes">Notes</h3>

          <div className="notes-container">
            {notes.map((note,index) => (
              <div className="note-card" key={index}>
                <p>{note}</p>
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(note)}
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
