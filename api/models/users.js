const dynamoose = require("dynamoose");

const users_schema = new dynamoose.Schema({
  user_id: {
    type: String,
    required: true,
    hashKey: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  user_password: {
    type: String,
    required: true,
  },
  user_token: {
    type: String,
    required: true,
    default:""
  },
});

module.exports = dynamoose.model("404_found_users", users_schema);
