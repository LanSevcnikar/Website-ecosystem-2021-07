async function callAPI(url, data, token, refreshToken) {
  let payload = {
    method: "POST",
    headers: {
      "x-token": token,
      "x-grant-type": refreshToken,
      "Content-Type": "application/json",
    },
    body: data,
  };
  console.log(payload)
  const response = await fetch(url, payload).catch(() => "");
  return response;
}

export default async function(data, urlHook){
  const url = "http://192.248.167.127:4000" + urlHook;

  let token = localStorage.getItem("jwtAccessToken");
  let refreshToken = localStorage.getItem("jwtRefreshToken");
  if (!token) token = "";
  if (!refreshToken) refreshToken = "";

  data = JSON.stringify(data);
  const res = await callAPI(url, data, token, refreshToken);

  const status = res.status;
  const resdata = await res.json();
  console.log(resdata)
    
  const newAccessToken = res.headers.get("x-token") || "";
  const newRefreshToken = res.headers.get("x-refresh-token") || "";
  const authSuccess = res.headers.get("x-auth-success");

  console.log(newAccessToken, newRefreshToken, authSuccess);
  console.log('hiss')

  
  localStorage.setItem("jwtAccessToken", "");
  localStorage.setItem("jwtRefreshToken", "");
  localStorage.setItem("userData", JSON.stringify({}));

  if (authSuccess == "true") {
    if (newAccessToken) {
      localStorage.setItem("jwtAccessToken", newAccessToken);
      localStorage.setItem("jwtRefreshToken", newRefreshToken);
      localStorage.setItem("userData", JSON.stringify({email: "there"}));
    }
  } else {
    localStorage.setItem("jwtAccessToken", "");
    localStorage.setItem("jwtRefreshToken", "");
    localStorage.setItem("userData", JSON.stringify({}));
  }

  return { status: status, data: resdata };
}
