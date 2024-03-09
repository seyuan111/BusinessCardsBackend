const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`Connection Successful`))
  .catch(error => console.log(error.message));

const userSchema = mongoose.Schema({
    name: String,
    age: String,
    email: String,
    occupation: String,
    contact: String
})

const User = mongoose.model("User", userSchema)

const businessCardSchema = mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    email: {type: String, required: true},
    occupation: String,
    contact: String
})

const Business = mongoose.model("Business", businessCardSchema)

app.get("/", (req,res) => {
    console.log(req)
    return res.status(234).send("I just did my MERN Stack")
})

app.post('/cards', async (req,res) => {
    try {
        if(
            !req.body.name ||
            !req.body.age ||
            !req.body.email ||
            !req.body.occupation ||
            !req.body.contact
        ){
            return res.status(400).send({
                message: "Please fill in the require fields"
            })
        }
        const newUser = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            occupation: req.body.occupation,
            contact: req.body.contact

        }

        const user = await User.create(newUser)
        return res.status(201).send(user)

    }catch(error){
        console.log(error.message)
        res.status(500).send({ message: error.message})
    }
})

app.get("/cards", async (req,res) => {
    try{
        const user = await User.find({})
        return res.status(200).json({
            count: user.length,
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

app.get("/cards/:id", async (req,res) => {
    try{

        const { id } = req.params

        const user = await User.findById(id)

        return res.status(200).json({
            count: user.length,
            data: user
        })
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
})

app.put("/cards/:id", async (req,res) => {
    try{
        if(
            !req.body.name ||
            !req.body.age ||
            !req.body.email ||
            !req.body.occupation ||
            !req.body.contact
        ){
            return res.status(400).send({
                message: "Please fill in the require fields"
            })
        }

        const { id } = req.params

        const result = await User.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({ message: "Couldnt find user"})
        }

        return res.status(200).send({ message: "User updated successfully"})

    }catch (err){
        console.log(err.mesage)
    }
})

app.delete('/cards/:id', async (req,res) => {
    try{

        const { id } = req.params;

        const result = await User.findByIdAndDelete(id)

        if(!result) {
            return res.status(400).json({ message: "User not found"})
        }

        return res.status(200).send({ message: "User deleted successfully"})

    }catch(err){
        console.log(err.messaage)
        res.status(500).send({ message: err.message })
    }
})

app.listen(port, () => {
    console.log(`Server connected to ${port}`)
})