const express = require("express")
const app = express.Router()
const {loginCheckMiddleware} = require("../middlewares/jwtvalidation")
const {fieldsChecker} = require("../middlewares/plansValidation")
const PlanFeatures = require("../models/plan_features")

app.use(express.json())  





app.post("/features/:id/new",async(req,res)=>{
    const planID = req.params.id;
    const Feature = req.body.feature.trim();
    try{
        
        result = await PlanFeatures.create({
            plan_id:planID,
            feature_desc : Feature
        });
        res.status(202).json({
            "success":"true",
            "message":`feature to plan with ID ${planID} added successful`
        });
    }
    catch(e){
        res.status(500).json({
            "success":"error",
            "message": `already ${Feature} is added`
        });
    }
})





app.get("/features/:id/edit",loginCheckMiddleware,(req,res)=>{
    const featureID = req.params.featureid;

    let result = PlanFeatures.findOne({
        where:{
            id : featureID
        }
    })
    if (result!=Null)
    {
        res.json({
            "success" : "true" ,
            "result" : result
        })
    }
    else{
        res.json({
            "success" : "false" ,
            "result" : "feature not availabe"
        })
    }
})





app.put("/features/:featureid/edit",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    try{
        const featureID = req.params.featureid;
        const Feature = req.body.feature;
        let result=await PlanFeatures.update({ 
            feature_desc:Feature,
            price : price
        }, {
            where: {
              id: featureID
            }
          })
          if (result[0]==1)
          {
              res.status(202).json({
                  "success":"true",
                  "message": `feature with ID ${planID} updated sucessfully`
              });
          }
          else{
              res.status(202).json({
                  "success":"false",
                  "message": `feature with ID ${planID} not exists`
              });
          }
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

        let result = await Plan.destroy({
            where:{
                id:featureID
            }
        });
        if (result ==1)
            {
                res.status(202).json({
                    
                    "success":"true",
                    "message": `Feature with ID ${featureID} Sucessfully deleted`
                });
            }
            else{
                res.status(202).json({
                    
                    "success":"false",
                    "message": `Feature with ID ${featureID} not exists`
                });
            }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error while deleting Feature with ID ${featureID}`
        });
    }
})


module.exports=app