
import getUserJwt from "./getUserJwt";

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
    let token = localStorage.getItem("jwtAccessToken");
    let refreshToken = localStorage.getItem("jwtRefreshToken");
    if(!token) token = ""
    if(!refreshToken) refreshToken = ""
    data = JSON.stringify(data);
    const url = "http://localhost:4000/graphql"
    const res = await callAPI(url, data, token, refreshToken)
    const status = res.status;
    const resdata = await res.json();
    const newAccessToken = res.headers.get('x-token') || "";
    const newRefreshToken = res.headers.get('x-refresh-token') || "";
    const authSuccess = res.headers.get('x-auth-success');
    if(authSuccess == 'true'){
        if(newAccessToken){
            localStorage.setItem("jwtAccessToken", newAccessToken);
            localStorage.setItem("jwtRefreshToken", newRefreshToken);
        }
        getUserJwt();
    }else{
        localStorage.setItem("jwtAccessToken", "");
        localStorage.setItem("jwtRefreshToken", "");
        localStorage.setItem("userData", JSON.stringify({}));
    }

    
    return {status: status, data: resdata}; 
}