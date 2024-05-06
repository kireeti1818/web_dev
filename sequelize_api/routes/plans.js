const express = require("express")
const app = express.Router()
const { Plan, PlanFeatures } = require("../models/plan_asso_features")
// const PlanFeatures = require("../models/plan_features")
const {loginCheckMiddleware} = require("../middlewares/jwtvalidation")
const {fieldsChecker} = require("../middlewares/plansValidation")

app.use(express.json())  


app.get("/", async (req, res) => {
    try {
        // Perform a left join to include the associated PlanFeatures
        const result = await Plan.findAll({
            include: [{
                model: PlanFeatures,
                as: 'features', // Use the alias defined in the association
                required: false // This ensures a left join
              }],
            attributes: ['id', 'planName', 'price', 'duration_in_years'] // Select specific fields from Plan
        });

        if (result.length > 0) {
            res.status(200).json({
                "success": "true",
                "response": result
            });
        } else {
            res.status(404).json({
                "success": "false",
                "message": "Currently no plans are available"
            });
        }
    } catch (error) {
        res.status(500).json({
            "success": "error",
            "message": "Error while retrieving plans",
            "error": error.message // It's helpful to provide the error message for debugging
        });
    }
});





app.post("/new",loginCheckMiddleware,fieldsChecker,async(req,res)=>{
    try{
        const planName = req.body.planname.trim().toLowerCase();
        let result = await Plan.findOne({
            where: {
                planName: planName
            }
        });
        if (result!=null) {
            res.json({
                "success":"false",
                "message":"plan already exists"
            });
        }

        else{
            const devices = req.body.devices.trim();
            const duration = req.body.duration.trim();
            const price = req.body.price.trim();
            await Plan.create({
                planName: planName,
                devices: devices,
                duration_in_years : duration,
                price : price 
            });
            res.status(202).json({
                "success":"true",
                "message":"Plan added successful"
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message":"error occured while creating"
        });
    }
})





app.get("/:id",async(req,res)=>{
    const planID = req.params.id;
    try
    {
        let result = await Plan.findOne({
            where: {
                id: planID
            }
        });

        if (result!=null)
        {
            res.status(202).json({

                "success":"true",
                "response" : result
            });
        }
        else{
            res.status(500).json({
                "success":"false",
                "message": `Plan with id ${planID} not exists `
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"false",
            "message": `error occured while retrieving plan `
        });
    }
})





app.delete("/:id",loginCheckMiddleware,async(req,res)=>{
    const planID = req.params.id;
    try{
        let result = await Plan.destroy({
            where:{
                id:planID
            }
        })
        if (result ==1)
        {
            res.status(202).json({
                
                "success":"true",
                "message": `plan with ID ${planID} Sucessfully deleted`
            });
        }
        else{
            res.status(202).json({
                
                "success":"false",
                "message": `plan with ID ${planID} not exists`
            });
        }
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
        let result = await Plan.findOne({
            where: {
                id: planID
            }
        });
        if (result==null) {
            res.json({
                "success":"false",
                "message":`plan with id ${id} not exists`
            });
        }
        else
        {
                res.status(202).json({
                "success":"true",
                "response": result
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

        let result=await Plan.update({ 
            planName: planName ,
            devices:devices,
            duration_in_years:duration,
            price : price
        }, {
            where: {
              id: planID
            }
          })
        if (result[0]==1)
        {
            res.status(202).json({
                "success":"true",
                "message": `plan with ID ${planID} updated sucessfully`
            });
        }
        else{
            res.status(202).json({
                "success":"false",
                "message": `plan with ID ${planID} not exists`
            });
        }
    }
    catch{
        res.status(500).json({
            "success":"error",
            "message": `error occured while creating plan with ID ${planID} `
        });
    }
})


module.exports = app;