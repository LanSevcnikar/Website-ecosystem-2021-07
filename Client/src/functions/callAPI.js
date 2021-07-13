async function callAPI(url, data, token, refreshToken) {
  console.log(refreshToken)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            authorization: token,
            'x-grant-type': refreshToken,
            "Content-Type": "application/json",
        },
        body: data,
    }).catch(() => "");
    return response;
}

export default async function (data) {
    let token = localStorage.getItem("jwtAccessToken");
    let refreshToken = localStorage.getItem("jwtRefreshToken");
    if(!token) token = ""
    if(!refreshToken) refreshToken = ""
    data = JSON.stringify(data);
    const url = "http://localhost:4000/graphql"
    const res = await callAPI(url, data, token, refreshToken)
    console.log(res)
    const status = res.status;
    const resdata = await res.json();
    return {status: status, data: resdata}; 
}