import { createStore } from 'vuex'

async function callAPI(url, data, token) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "bearer " + token,
      "Content-Type": "application/json",
    },
    body: data,
  });
  return response;
}

export const store = createStore({
  mutations: {
    callGraphQL(DD, url, token) {
      const D = JSON.stringify(DD);
      callAPI(url, D, token)
        .then((r) => r.json())
    }
  }
})