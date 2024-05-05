const express = require("express")
const app = express.Router()
const pool = require("../db/db")
const {loginCheckMiddleware} = require("../middlewares/jwtvalidation")
const {fieldsChecker} = require("../middlewares/plansValidation")

app.use(express.json())  


app.get("/features/new",loginCheckMiddleware,(req,res)=>{
    res.json({
        "message":"render add feature page"
    })
})

app.post("/features/:id/new",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    try{
        const planID = req.params.id;
        const Feature = req.body.feature.trim();
        let addFeatureQuery = "insert into plan_features(plan_id, feature_desc, created_at, updated_at) values ('"+planID+"','"+Feature+"',now(),now());"
        await pool.query(addFeatureQuery);
        res.status(202).json({
            "success":"true",
            "message":`feature to plan with ID ${planID} added successful`
        });
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": "error occured while inserting feature"
        });
    }
})


app.get("/features/:id/edit",loginCheckMiddleware,(req,res)=>{
    res.json({
        "message":"render edit feature page"
    })
})


app.put("/features/:featureid/edit",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    try{
        const featureID = req.params.featureid;
        const Feature = req.body.feature;
        let editFeatureQuery = "UPDATE plan_features SET feature_desc = '"+Feature+"',updated_at = now() WHERE id='"+featureID+"'";
        await pool.query(editFeatureQuery);
        res.status(202).json({
            "success":"true",
            "message":"feature edited successful"
        });
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": "error occured while editing feature"
        });
    }
})


app.delete("/features/:featureid",loginCheckMiddleware,async(req,res)=>{
    const featureID = req.params.featureid;
    try{
        let deleteFeatureQuery = "DELETE FROM plan_features WHERE id='"+featureID+"'";
        await pool.query(deleteFeatureQuery);
        res.status(202).json({
            
            "success":"true",
            "message": `Feature with ID ${featureID} Sucessfully deleted`
        });
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error while deleting Feature with ID ${featureID}`
        });
    }
})


module.exports=app