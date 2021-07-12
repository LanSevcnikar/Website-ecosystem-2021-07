const jwt = require("jsonwebtoken")
export default (request) => {
  const header = request.req.headers.authorization;
  if (!header) return { isAuth: false };
  const token = header.split(" ");
  if (!token) return { isAuth: false };
  let decodeToken;
  try {
    decodeToken = jwt.verify(token[1], privateKey);
  } catch (err) {
    return { isAuth: false };
  }
  if (!!!decodeToken) return { isAuth: false };
  return { isAuth: true, userId: decodeToken.userId };
}