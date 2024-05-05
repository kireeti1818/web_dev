const express = require("express")
const bcrypt = require("bcrypt");
const app = express.Router()
const pool = require("../db/db")
const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../config");
const {emailFormatChecker, passwordFormatChecker ,nameNullChecker} = require("../middlewares/authenticationValidation")


app.get("/signup",(req,res)=> {
    res.json({
        "message":"render signup page"
    })
})




app.post("/signup", emailFormatChecker, passwordFormatChecker ,nameNullChecker,async(req,res)=> {
    const email = req.headers['email'].trim().toLowerCase();
    let searchUserlQuery = "SELECT * FROM admins WHERE Email ='"+email+"'";
    const [result] = await pool.query(searchUserlQuery);
    if (result.length !=0) {
        res.json({
            "message":"user already exists"
        });
    }
    else{
        const username = req.headers['fullname'].trim();
        const password = req.headers['password'].trim();

        const bcryptPassword = await bcrypt.hash(password,10)
        let insertUserQuery =  "INSERT INTO admins (Fullname, Email, password, created_at, updated_at) VALUES ('"+username+"','"+email+"','"+ bcryptPassword+"',now(),now());";
        await pool.query(insertUserQuery);
        const token = jwt.sign({email}, jwtPassword,{"expiresIn":"5h"});
        res.status(202).json({
            "success":true,
            "message":"Signup successful",
            token
        });

    }
 
})


app.get("/login",(req,res)=> {
    res.json({
        "message":"render login page"
    })
})



app.post("/login",emailFormatChecker, async(req,res)=> {
    const email = req.headers['email'].trim().toLowerCase();
    let searchUserQuery = "SELECT password FROM admins WHERE Email ='"+email+"'";

    const [result] = await pool.query(searchUserQuery);
    if (result.length !=0) {
        const password = req.headers['password'].trim();
        const isMatch = await bcrypt.compare(password,result[0].password)
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
