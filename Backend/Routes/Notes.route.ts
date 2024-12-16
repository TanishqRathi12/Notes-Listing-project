import { Router } from "express";

import { addNotesToStudent } from "../Controllers/Notes.Controller";
import { getNotesOfStudent } from "../Controllers/Notes.Controller";

const NotesRouter = Router();

NotesRouter.get('/health',(req,res)=>{
    res.send('Ok!');
});

NotesRouter.post('/addNotes',(req,res)=>{
    addNotesToStudent(req,res);
});

NotesRouter.post('/getNotes',(req,res)=>{
    getNotesOfStudent(req,res);
});

export default NotesRouter;