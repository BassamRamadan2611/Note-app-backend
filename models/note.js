const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NoteSchema= new Schema({
   title:String,
   Description:String,
   NoteOwner:String,
   dateOfNotes:String
  
})

const Note = mongoose.model("Note",NoteSchema)

module.exports = Note;