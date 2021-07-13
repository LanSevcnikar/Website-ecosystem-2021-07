async function callAPI(url, data, token, refreshToken) {
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
    let token = localStorage.getItem("jwtToken");
    let refreshToken = localStorage.getItem("jwtTokenRefresh");
    if(!token) token = ""
    if(!refreshToken) refreshToken = ""
    data = JSON.stringify(data);
    const url = "http://localhost:4000/"
    const res = await callAPI(url, data, token)
    console.log(res)
    const status = res.status;
    const resdata = await res.json();
    return {status: status, data: resdata}; 
}