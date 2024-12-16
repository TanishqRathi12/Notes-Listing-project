const Notes = require('../Models/User');
import { Request, Response } from "express";



export const addNotesToStudent = async (req: Request, res: Response) => {
  const { studentId, note } = req.body; 

  try {
    if (studentId && note) {
      return res.status(400).send('Student ID and note are required');
    }

    const updatedStudent = await Notes.findOneAndUpdate(
      { studentId }, 
      { $push: note  }, 
      { new: true } 
    );

    if (!updatedStudent) {
      return res.status(404).send('Student not found');
    }

    return res.status(200).json({message:"Note added successfully"});
  } catch (err) {
    return res.status(500).send('Server error');
  }
};


export const getNotesOfStudent = async (req: Request, res: Response) => {
    const { studentId } = req.body;
    
    try {
        if (!studentId) {
        return res.status(400).send('Student ID is required');
        }
    
        const student = await Notes.findOne({ studentId });

        if (!student) {
        return res.status(404).send('Student not found');
        }
        
        return res.status(200).json({notes:student.notes , name:student.name, email:student.email});
    } catch (err) {
        return res.status(500).send('Server error');
    }
}
