const express = require("express")
const app = express()

const plansRoutes = require("./routes/plans")
const authenticationRoutes = require("./routes/authentication")
const planFeaturesRoutes = require("./routes/plan_features")

app.use("/plans",plansRoutes)
app.use("/plans",planFeaturesRoutes)
app.use("/",authenticationRoutes)




app.use((err,req,res,next)=>{
    res.json({"message":`error occured in server ${err}`})
})

app.listen(18185,()=>{
    console.log("listening on port 18185")
})