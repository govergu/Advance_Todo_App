const jwt = require("jsonwebtoken");
const config = require("../config/index");
const generateToken = (id, role) => {
  const token = jwt.sign({ id, role }, config.jwt, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = generateToken;
