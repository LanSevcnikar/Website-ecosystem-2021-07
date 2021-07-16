const jwt = require("jsonwebtoken");
const fs = require('fs');

const privatekey = fs.readFileSync('./keys/private.key', 'utf8');

const signOptions = {
  issuer: "Lan's code",
  algorithm: "RS256"
}



async function createTokens(user) {
  console.log('hello, time to make some tokens')
  const userModelRefresh = { id: user.id }; //Only stores the userId
  const refreshToken = await jwt.sign(userModelRefresh, privatekey, { ...signOptions, expiresIn: 15 * 60 });
  const hasuraSet = {
    "x-hasura-allowed-roles": [user.role],
    "x-hasura-default-role": user.role,
    "x-hasura-user-id": user.id,
  }
  console.log(hasuraSet);
  const userModelAccess = { ...user, "https://hasura.io/jwt/claims": hasuraSet };      //Holds most of the data for the user, such as name, id... (all of this can be read by the browser)
    console.log(userModelAccess);
  const accessToken = await jwt.sign(userModelAccess, privatekey, {  ...signOptions, expiresIn: 60 * 60 });

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