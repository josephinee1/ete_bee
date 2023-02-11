
const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db_elements = require("./connect/getENV")
const routes = require("./routes")



mongoose.set('strictQuery',true);
const app=express()
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
mongoose.connect(db_elements.db_url,
{

}).then(()=>
{
    app.use("/api", routes)
    console.log("Middleware added, starting connection!!")
    app.listen(db_elements.db_port,()=>
    {
        console.log("Connected to MongoDB(Atlas)!!")
        console.log(`Server running on port: ${db_elements.db_port}`)
    }
)}).catch((error)=>
{
    console.log(error)
    // logger_all.Logg.error(error)
});


















// npm run server
