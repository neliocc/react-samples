const express = require('express');
const router = express.Router();
const db=require("../models");
/* Sample Authenticated Rout. */
router.get('/', function(req, res, next) {
  res.send({username:req.user.username,token:req.user.token});
});

router.post("/task",(req,res)=>{
    db.Task.create({
      title:req.body.title,
      notes:req.body.notes,
      dueDate:req.body.dueDate,
      completed:false,
      user:req.body.userId
    }).then(task=>res.json(task),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
  })
  router.get("/tasks/:user",(req,res)=>{
    db.Task.find({user:req.params.user}).then(tasks=>res.json(tasks),error=>res.sendStatus(500)).catch(error=>res.sendStatus(500));
  })
module.exports = router;