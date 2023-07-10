const User = require("../models/users")
exports.getuserdata = (req,res,next)=>{
    User.query("user_id").eq(req.userData.user_id).exec().then((users)=>{
        const user = users[0];
        delete user.user_token;
        delete user.user_password;
        res.status(200).json({status:1, user:user})
    }).catch((err)=>{
        res.status(500).json({status:0,message:err})
    })
}