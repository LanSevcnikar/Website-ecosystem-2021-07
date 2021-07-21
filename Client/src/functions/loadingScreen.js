import { store } from "../store";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function(fun, ...args){
  console.log("LoadingScreenThing")
  store.commit("change", true)
  let result = null
  try{ result = await fun(...args)}
  catch(e){alert(e)}
  store.commit("change", false)
  await sleep(30)
  return result;
}