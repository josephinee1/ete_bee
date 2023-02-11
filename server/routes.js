const express = require("express")
const TEST = require("./models/Test")
const USER = require("./models/user")
// const Logger=require('./connect/logg')
const bcrypt = require('bcrypt');
const router = express.Router()






// --------------------------------------------------------------------------------
// Auth working signin / signup api check
// --------------------------------------------------------------------------------


// signup check
router.post("/post/sign-up", async (req, res) => {
	var name=req.body.name;
	var email=req.body.email;
	const ss = bcrypt.genSaltSync(10);
	const pass = bcrypt.hashSync(req.body.pass, ss);
	try 
	{
        const ele=await USER.findOne({user_email:email}).exec();
        if(ele!==null)
		{
			res.status(200).send({message:"alreadyExist",data:false});
		}
		else
		{
			try
			{
				const ele=await USER.insertMany([{user_name:name,user_email:email,user_pass:pass,user_updated:false}]);
				const ele1=await USER.findOne({user_email:email}).exec();
				res.status(200).send({message:"createdSuccess",data:email})
			}
			catch(error) {
				res.status(404).json({message:error.message});
			}
		}
    }
	catch (error) 
	{
        res.status(404).json({message:error.message});
    }
})



// Signin Check
router.post("/post/sign-in", async (req, res) => {
	var email=req.body.email;
	var pass=req.body.pass;
	try 
	{
        const ele=await USER.findOne({user_email:email}).exec();
		
        if(ele!==null)
		{
			if (bcrypt.compareSync(pass,ele.user_pass))
			{
				res.status(200).send({message:"loginSuccess",data:email});
			}
			else
			{
				res.status(200).send({message:"loginFailed",data:false});
			}
			
		}
		else
		{
			res.status(200).send({message:"loginFailed",data:false});
		}
    }
	catch (error) 
	{
        res.status(404).json({message:error.message});
    }
})










module.exports = router