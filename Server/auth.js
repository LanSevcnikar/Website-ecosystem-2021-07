const db = require("./db");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const jwtSecret = "ImagineJeFUlKulModel";

async function createTokens(user) {
  const userModelRefresh = { id: user.id };
  const refreshToken = await jwt.sign(userModelRefresh, jwtSecret, { expiresIn: 120 });

  const userModelAccess = { ...user };
  const accessToken = await jwt.sign(userModelAccess, jwtSecret, { expiresIn: 7 });

  return [accessToken, refreshToken, userModelAccess];
};

async function refreshTokens(userId) {
  const user = db.students.get(userId);

  const [newAccessToken, newRefreshToken, userModelAccess] = await createTokens(user);
  return [{
    token: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  }, userModelAccess];
};

module.exports = { createTokens, refreshTokens }