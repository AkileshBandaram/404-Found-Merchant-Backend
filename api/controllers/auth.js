const User = require("../models/users")
const bcrypt = require("bcrypt");
const { v1: uuidv1 } = require("uuid");
const jwt = require("jsonwebtoken");
exports.signup = (req,res,next)=>{
    if(req.body.user_email=="" || req.body.user_name=="" || req.body.user_password==""){
        res.status(200).json({status:0,message:"All frilds are required"})
    }else{
    User.scan("user_email").eq(req.body.user_email).exec().then((users)=>{
        if(users.count>0){
            res.status(200).json({status:0,message:"Email already in use"})
        }else{
            bcrypt.hash(req.body.user_password,10 , (err,hash)=>{
                if(err){
                    res.status(500).json({status:0,message:"Something went wrong"})
                }else{
                    const user = new User({user_id:uuidv1(), user_name:req.body.user_name, user_email:req.body.user_email, user_password:hash});
                    user.save().then(()=>{
                        res.status(200).json({status:1,message:"Signup Successfull"});
                    }).catch((err)=>{
                        res.status(500).json({status:0,message:err})
                    })
                }
            });
        }
    }).catch((err)=>{
        res.status(500).json({status:0,message:err})
    })
}
}

exports.signin = (req,res,next)=>{
    User.scan("user_email").eq(req.body.user_email).exec().then((users)=>{
        if(users.count>0){
            const user = users[0];
            bcrypt.compare(req.body.user_password, user.user_password, (err,result)=>{
                if(err){
                    res.status(500).json({status:0,message:"something went wrong"})
                }
                if(result){
                    const token = jwt.sign({
                        user_email:user.user_email,
                        user_id:user.user_id
                    }, process.env.JWT_KEY,
                    {expiresIn:"1h"});
                    res.status(200).json({status:1, message:"auth successfull", auth_token:token})
                }else{
                    res.status(200).json({status:0,message:"no user found"})
                }
            })
        }else{
            res.status(200).json({status:0,message:"no user found"})
        }
    }).catch((err)=>{
        res.status(500).json({status:0,message:err})
    })
}