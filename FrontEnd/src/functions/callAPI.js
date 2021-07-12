async function callAPI(url, data, token) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: (token ? "bearer " + token : ""),
            "Content-Type": "application/json",
        },
        body: data,
    }).catch(() => "");
    return response;
}

export default async function (data, token = "",  url = "http://localhost:9000/api") {
    data = JSON.stringify(data);
    const res = await callAPI(url, data, token);
    const status = res.status;
    const resdata = await res.json();
    return {status: status, data: resdata}; 
}