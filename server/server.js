const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const app = express();
const cors=require("cors");
app.use(cors());
const mongoose = require("mongoose");
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mytodos",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

const db=require("./models");
const md5=require("md5");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register",(req,res)=>{
  db.User.create({
    username:req.body.username,
    password:md5(req.body.password)
  }).then(user=>res.json(user),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
})

app.post("/task",(req,res)=>{
  db.Task.create({
    title:req.body.title,
    notes:req.body.notes,
    dueDate:req.body.dueDate,
    completed:false,
    user:req.body.userId
  }).then(task=>res.json(task),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
})
app.get("/tasks/:user",(req,res)=>{
  db.Task.find({user:req.params.user}).then(tasks=>res.json(tasks),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
})
app.post("/login",(req,res)=>{
  db.User.findOne({
    username:req.body.username
  }).then(user=>{
    if(user.password===md5(req.body.password)) {
      res.json(user);
    } else {
      res.sendStatus(401)
    }
    
  },error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
})

app.get("/",(req,res)=>{
  res.sendStatus(200);
})
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
