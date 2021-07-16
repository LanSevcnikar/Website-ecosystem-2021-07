const jwt = require("jsonwebtoken");
const fs = require('fs');


const privatekey = fs.readFileSync('./keys/private.key', 'utf8');
const publickey = fs.readFileSync('./keys/public.key', 'utf8');

const signOptions = {
  issuer: "Lan's code",
  algorithm: "RS256"
}

async function createTokens(user) {
  const userModelRefresh = { id: user.id };
  const refreshToken = await jwt.sign(userModelRefresh, privatekey, { ...signOptions, expiresIn: 15 * 60 });
  const userModelAccess = { ...user };
  const accessToken = await jwt.sign(userModelAccess, privatekey, {  ...signOptions, expiresIn: 3 * 60 });

  return [accessToken, refreshToken, userModelAccess];
};

async function refreshTokens(userId, pg) {
  const tempConst = await pg.query('select * from students where id = $1', [userId]);
  const user = tempConst.rows[0]
  const [newAccessToken, newRefreshToken, userModelAccess] = await createTokens(user);
  return [{
    token: newAccessToken,
    refreshToken: newRefreshToken,
    user,
  }, userModelAccess];
};

module.exports = { createTokens, refreshTokens }