const User = require("../models/users")
const CryptoJS = require('crypto-js');

exports.savetoken = (req,res,next)=>{
    if(req.body.api_key=="API_e453222f-9e44-48c6-b22b-fe5394995bd6"){
        User.scan("user_email").eq(req.body.user_email).exec().then((users)=>{
            if(users.count>0){
                const user = users[0];
                const encryptedToken = CryptoJS.AES.encrypt(req.body.user_token, 'A7mBSxZrjCYZObWd1ziU5wYqm5KyFUqK').toString();
                User.update({user_id:user.user_id, user_token:encryptedToken}).then(()=>{
                    res.status(200).json({status:1, message:"Token Saved"})
                }).catch((err)=>{
                    res.status(500).json({status:0,message:"Something went wrong"})
                })
            }else{
                res.status(500).json({status:0,message:"Something Went Wrong"})
            }
        }).catch((err)=>{
            res.status(500).json({status:0,message:err})
        })
    }else{
        res.status(500).json({status:0,message:"Something Went Wrong"})
    }
}