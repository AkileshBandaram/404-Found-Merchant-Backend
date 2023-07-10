const jwt = require("jsonwebtoken");
const User = require("../models/users");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_KEY);
          User.query("user_id")
            .eq(decoded.user_id)
            .exec()
            .then((users) => {
              if (users.length > 0) {
                decoded.user_name = users[0].user_name;
                req.userData = decoded;
                next();
              } else {
                return res.status(200).json({
                  status: 0,
                  message: "Auth Failed",
                });
              }
            })
            .catch((err) => {
              res.status(500).json({
                status: 0,
                message: err,
              });
            });
      
  } catch (error) {
    return res.status(200).json({
      status: 0,
      message: "Auth Failed",
    });
  }
};
