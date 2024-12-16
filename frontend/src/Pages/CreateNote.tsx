import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Common.css";

const CreateNote: React.FC = () => {
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: noteContent }),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="create-note-container">
      <div className="form-wrapper">
        <h1>Create Note</h1>
        <form onSubmit={handleCreateNote}>
          <label htmlFor="noteContent">Note Content</label>
          <textarea
            id="noteContent"
            rows={5}
            placeholder="Enter your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            required
          />
          <button type="submit">Add Note</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
