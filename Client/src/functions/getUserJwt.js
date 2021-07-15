
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
export default function () {
  const tempTokenAcc = localStorage.getItem("jwtAccessToken");
  const tempTokenRef = localStorage.getItem("jwtRefreshToken");
  const decodeAcc = parseJwt(tempTokenAcc);
  const decodeRef = parseJwt(tempTokenRef);
  const userData = {
    email: decodeAcc.email,
    firstName: decodeAcc.firstName,
    lastName: decodeAcc.lastName,
    expires: decodeRef.exp,
    college: decodeAcc.college,
  }
  localStorage.setItem("userData", JSON.stringify(userData));
  
  const dTime = decodeRef.exp - decodeRef.iat;
  return dTime;
}