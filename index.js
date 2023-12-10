const express = require("express")

const app = express()
const cors = require('cors')
app.use(cors()) // Use this after the variable declaration
const Note = require("./models/note")
// url of connection string 
const DBUrl = "mongodb://bassamramadan964:bassam261199@ac-a8nvttp-shard-00-00.pk0iygm.mongodb.net:27017,ac-a8nvttp-shard-00-01.pk0iygm.mongodb.net:27017,ac-a8nvttp-shard-00-02.pk0iygm.mongodb.net:27017/?ssl=true&replicaSet=atlas-xyp5zf-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoose = require("mongoose")

//connect to db
mongoose.connect(DBUrl).then(()=>{
    console.log("server connected to db successsfully")
}).catch((error)=>{
    console.log(error)
})

app.use(express.json())

// test server home page 
app.get("/",(req,res)=>{
    res.send("welcome to home page ")
})

//add note to db 

app.post("/notes", async(req,res)=>{
    const newNote = new Note ()
    newNote.title =req.body.title
    newNote.Description = req.body.Description
    newNote.NoteOwner =req.body.NoteOwner
    newNote.dateOfNotes =req.body.dateOfNotes
     await newNote.save()
     res.send("the new note has been stored")
})

//get all notes 

app.get("/notes",async(req,res)=>{
    const notes = await Note.find()
    res.json(notes)

})
// get note by id 
app.get("/notes/:id",async(req,res)=>{

    const noteId = req.params.id
    const note = await Note.findById(noteId)
    res.json(note)


})
//update specific note 
app.put("/notes/update/:id",async(req,res,next)=>{
try{
    const noteId = req.params.id
    const note = await Note.findById(noteId)

    if(!note){
        return res.json({
            success:false,
            message :"Note id is not exist"
        })
    } 
    
    else {

        const newnote = await Note.findOneAndUpdate(note,req.body)

        res.json({
            success:true,
            message:"note updated successfully",
            note : newnote
        })
    }
}
             catch (error){
next(error);
              }
  
   

})
// delete specific note 

app.delete("/notes/:id",async(req,res)=>{
    const noteId = req.params.id
    const note = await Note.findByIdAndDelete(noteId)

    res.send(note)
})

// listen server on http://localhost:3000/
app.listen("3000",(req,res)=>{console.log("server is listening in port 3000")})