const express = require("express")
const app=express()
app.use(express.json())  

function fieldsChecker(req, res, next) {
    let err={}
    if ("planname" in req.body)
    {
        const planName = req.body.planname.trim().toLowerCase();
        console.log(planName)
        var nameRegex = /^[a-zA-Z\s]+$/;
        if(planName.length==0)
        {
            err["planname"] = "planname should be atleast 1 character long";
        }
        else if (!nameRegex.test(planName))
            {
                err["planname"] = "Invalid planname format. Please enter a planvalid name containing alphabetic characters, spaces";
            }
    }
    
    if ("devices" in req.body)
    {
        const devices = req.body.devices.trim();
        let response = Number(devices);
        if(!response)
        {
            err["devices"] = "devices should be atleast 1 character long";
        }
    }

    if ("devices" in req.body)
    {
        const duration = req.body.duration.trim();
        let response = Number(duration);
        if(!response)
        {
            err["duration"] = "duration should be atleast 1 character long";
        }
    }
    if ("price" in req.body)
    {
        const price = req.body.price.trim();
        let response = Number(price);
        if(!response)
        {
            err["price"] = "price should be atleast 1 character long";

        }
    }

    if ("feature" in req.body)
    {
        const Feature = req.body.feature.trim();
        if(Feature.length==0)
        {
            err["feature"] = "feature should be atleast 1 character long";

        }
    }
    
    var count = 0;
    for(var i in err) {
        count++;
    }
    if (count==0)
    {
        next();
    }
    else
    {
        res.json(
        {
            "error" : err
        });
    }
}


module.exports = {fieldsChecker}