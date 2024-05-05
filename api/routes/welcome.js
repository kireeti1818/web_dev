const express = require("express")
const app = express.Router()

app.get("/",(req,res)=>
{
    res.status(200).json({"response":"home page"})
})

module.exports = app