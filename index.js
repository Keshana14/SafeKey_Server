import express from 'express';
import mongoose, { connect } from 'mongoose';
import cors from 'cors'
import "dotenv/config"
import Account from './models/Accountschema.js';
import Save from './models/Saveaccounts.js';

const app = express();
app.use(express.json())

app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(cors())

app.get("/", (req,res) => { 
  res.status(200).json("fish")
})

app.post("/createaccount", async (req,res) => {
  const {email,password} = req.body;
  console.log(email,password)
  try {
    const user = Account({email,password});
    await user.save();
    res.status(200).json("user created successfully")
  }catch(error){
    console.log(error)
    res.status(500).json("internal server")
  }
})

app.post("/signin", async (req,res) => {
  const {email,password} = req.body;
  console.log(email,password)
  console.log("hhhj");
  try {
    const user = await Account.findOne({email});
    const auth = password === user.password
    if(!auth){
      return res.status(400).json("invalid email or password")
    }
    console.log(user)
    res.status(200).json({message:"user signin", user: user})
  }catch(error){
    console.log(error)
    res.status(500).json("internal server")
  }
})

app.get("/save/:userId", async (req,res) => {
  const {userId} = req.params;
  try{
    console.log(userId)
    const saveAccount = await Save.find({userId}, {_id: 1, type: 1, shortName: 1, websiteORdevice: 1, userName: 1, password: 1})
    console.log(saveAccount)
    res.status(200).json(saveAccount)
  }catch(error){
    console.log(error)
    res.status(500).json("user not found")
  }
})

app.post("/save", async (req,res) => {
  const {email,type,shortName,websiteORdevice,userName,password} = req.body;
  console.log(req.body)
  try {
    const user = await Account.findOne({email});
    if(!user){
      return res.status(404).json("user not found")
    }
    const saveAccount = Save({userId: user._id, type , shortName, websiteORdevice, userName, password
    })
    await saveAccount.save()
    res.status(200).json("account saved successfully")
  }catch(error){
    console.log(error)
    res.status(500).json("internal server")
  }
})

app.delete("/save/:deleteid", async (req,res) => {
 const {deleteid} = req.params
  try{
   await Save.deleteOne({_id: deleteid})
    res.status(200).json("delete successful")
  }catch(error){
    console.log(error)
    res.status(500).json("delete unsuccessful")
  }
})

app.put("/changeuserdetails", async (req,res) => {
  const {email,password, newEmail, newPassword} = req.body;
  try {
    const user = await Account.findOne({email});
    const auth = password === user.password
    if(!auth){
      return res.status(400).json("invalid password")
    }
    if(newEmail){
      user.email = newEmail
    }
    if(newPassword){
      user.password = newPassword
    }
    await user.save()
    res.status(200).json("user updated successfully")
  }catch(error){
    console.log(error)
    res.status(500).json("user details not updated")
  }
})

mongoose.connect(process.env.MONGODBURL)
.then(() => {
  console.log("database connected")
  app.listen(process.env.PORT, () =>{
    console.log(`app.listen on port ${process.env.PORT}`)
  })
}).catch((error) => console.log(error))