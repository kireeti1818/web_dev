const express = require("express")
const app = express.Router()
const pool = require("../db/db")
const {loginCheckMiddleware} = require("../middlewares/jwtvalidation")
const {fieldsChecker} = require("../middlewares/plansValidation")

app.use(express.json())  

app.get("/",async (req,res)=>{
    try{
        const [result] = await pool.query("SELECT * FROM plans")
        if (result.length!=0)
        {
            res.status(202).json({
                "success":"true",
                "response" : result
            })
        }
        else{
            res.status(500).json({
                "success":"false",
                "message": "currently no plans are available"
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": "Error while retireve plans"
        });
    }

});



app.get("/new",loginCheckMiddleware,(req,res)=>{
    res.json({
        "message":"render create page"
    })
})



app.post("/new",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    try
    {    
        const planName = req.body.planname.trim().toLowerCase();
        let searchPlanQuery = "SELECT * FROM plans WHERE planName ='"+planName+"'";
        const [result] = await pool.query(searchPlanQuery);
        if (result.length !=0) {
            res.json({
                "success":"false",
                "message":"plan already exists"
            });
        }
        else{
            const devices = req.body.devices.trim();
            const duration = req.body.duration.trim();
            const price = req.body.price.trim();
            let insertPlanQuery =  "INSERT INTO plans (planName, devices, duration_in_years, price,created_at, updated_at) VALUES ('"+planName+"','"+devices+"','"+ duration+"','"+price+"',now(),now());";
            await pool.query(insertPlanQuery);
            res.status(202).json({
                "success":"true",
                "message":"Plan added successful"
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": "error occured while creating plan"
        });
    }
})


app.get("/:id",async(req,res)=>{
    const planID = req.params.id;
    try
    {
        let showPlanQuery = "SELECT * FROM plans WHERE id ='"+planID+"'";
        const [result] = await pool.query(showPlanQuery);
        if (result.length!=0)
        {
            res.status(202).json({

                "success":"true",
                "response" : result
            });
        }
        else{
            res.status(500).json({
                "success":"false",
                "message": `Unable to retireve plan with ID ${planID}`
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error occured while retireving plan with ID ${planID}`
        });
    }
})


app.delete("/:id",loginCheckMiddleware,async(req,res)=>{
    const planID = req.params.id;
    try{
        let deletePlanQuery = "DELETE FROM plans WHERE id='"+planID+"'";
        await pool.query(deletePlanQuery);
        res.status(202).json({
            
            "success":"true",
            "message": `plan with ID ${planID} Sucessfully deleted`
        });
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error while deleting plan with ID ${planID}`
        });
    }
})

app.get("/edit/:id",loginCheckMiddleware,async(req,res)=>{
    const planID = req.params.id;
    try{
        let retrievePlanQuery = "select * FROM plans WHERE id='"+planID+"'";
        let [result]=await pool.query(retrievePlanQuery);
        if(result.length!=0){
            res.status(202).json({
                "success":"true",
                "response": result
            });
        }
        else{
            res.status(500).json({
                "success":"false",
                "message": `Unable to retireve plan with ID ${planID}`
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error while retireving plan with ID ${planID}`
        });
    }
})

app.put("/edit/:id",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    const planID = req.params.id;
    const planName = req.body.planname.trim().toLowerCase();
    const devices = req.body.devices.trim();
    const duration = req.body.duration.trim();
    const price = req.body.price.trim();
    try{
        
        let updatePlanQuery = "UPDATE plans SET planName = '"+planName+"', devices= '"+devices+"', duration_in_years= '"+duration+"',price = '"+price+"',updated_at = now() WHERE id='"+planID+"';";
        await pool.query(updatePlanQuery);
        res.status(202).json({
            "success":"true",
            "message": `plan with ID ${planID} updated sucessfully`
        });
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error occured while creating plan with ID ${planID} `
        });
    }
})


module.exports = app;