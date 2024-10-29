const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const userSchema = require("../schemas/userSchema")

const User = new mongoose.model("User", userSchema)

router.get("/", async (req, res) => {
    try {
        const data = await User.find()
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
router.get("/:id", async (req, res) => {
    try {
        const data = await User.findOne({ _id: req.params.id })
        res.send(data)
    }
    catch (error) {
        res.send({ message: error })
    }
})
// post user in database
router.post("/", async (req, res) => {
    try {
        const userInfo = req.body
        const newUser = new User(userInfo)
        await newUser.save()
        res.send({ message: "data save successfull" })
    }
    catch (error) {
        console.log(error);
        res.send({ message: "data save problem" })
    }
})

//delete data
router.delete("/:id", async (req, res) => {
    // console.log("route work", req.params.id);
    try {
        const result = await User.deleteOne({ _id: req.params.id })
        res.send(result)
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
})


router.put("/:id", async (req, res) => {
    // console.log("router work", req.params.id);
    const updateInfo = req.body
    try {
        const result = await User.updateOne({ _id: req.params.id }, {
            $set: {
                name: updateInfo.name,
                email: updateInfo.email,
                gender: updateInfo.gender
            }
        })
        res.send(result)
    }
    catch (error) {
        res.send(error)
    }
})
module.exports = router