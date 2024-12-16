import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Common.css";
import axios from "../Axios/Axios.ts";

const CreateNote: React.FC = (): React.ReactElement => {
  const [noteContent, setNoteContent] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if(token) {
        const response = await axios.post(
          "/notes/addNotes",
          { note: noteContent },
          {
            headers: {
              Authorization: `Bearer ${token}`,

            },
          }
        );
      navigate("/dashboard");
    }
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
