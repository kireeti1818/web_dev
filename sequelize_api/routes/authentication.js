const express = require("express")
const bcrypt = require("bcrypt");
const app = express.Router()
const sequelize = require("../db/db")
const Admin = require("../models/authentication")
const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../config");

const {emailFormatChecker, passwordFormatChecker ,nameNullChecker} = require("../middlewares/authenticationValidation")


app.use(express.json())




app.post("/signup", emailFormatChecker, passwordFormatChecker ,nameNullChecker,async(req,res)=> {
    const email = req.body['email'].trim().toLowerCase();
    let result = await Admin.findOne({
        email:email
    });

    if (result!=null)
    {
        res.json({
            "message":"user already exists"
        });
    }
    else{
        const username = req.body['fullname'].trim();
        const password = req.body['password'].trim();

        const bcryptPassword = await bcrypt.hash(password,11)

        result = await Admin.create({
            email:email,
            fullName:username,
            password:bcryptPassword
        });
        const token = jwt.sign({email}, jwtPassword,{"expiresIn":"5h"});
        res.status(202).json({
            "success":true,
            "message":"Signup successful",
            token
        });

    }
 
})




app.post("/login",emailFormatChecker, async(req,res)=> {
    const email = req.body['email'].trim().toLowerCase();
    let result = await Admin.findOne({
        email:email
    });
    if (result!=null) {
        const password = req.body['password'].trim();
        const isMatch = await bcrypt.compare(password,result.dataValues.password)
        if(isMatch){
            const token = jwt.sign({email}, jwtPassword);
            res.status(202).json({
                "success":true,
                "message":"login successful",
                token
            });
        }
        else{
            res.status(403).json({
                "success":false,
                "message":"password is incorrect"
            });
        }
    }
    else{
        res.status(403).json({
            "success":false,
            "message":"user not exists"
        });
    }
});


module.exports = app;
