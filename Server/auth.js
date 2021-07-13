const db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const jwtSecret = "ImagineJeFUlKulModel";

async function createTokens (user) {
  let userModel = { id: user.id };

  const refreshToken = await jwt.sign(userModel, jwtSecret, { expiresIn: 120 });

  // You can control how much of the data goes into the jwt
  //It is readable by everyone and is thus importaint to protext user information
  // Usually, you put in the id, the role and that is
  userModel = { ...db.students.get(user.id) };

  const accessToken = await jwt.sign(userModel, jwtSecret, { expiresIn: 20 });

  console.log("tokens are logged in")

  return [accessToken, refreshToken];
};

async function refreshTokens (userId) {
  const user = db.students.get(userId);

  const [newAccessToken, newRefreshToken] = await createTokens(user);
  return {
    token: newAccessToken,
    refreshToken: newAccessToken,
    user,
  };
};

module.exports = {createTokens, refreshTokens}