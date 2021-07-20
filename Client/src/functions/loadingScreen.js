
import { store } from "../store";

export default async function(fun, ...args){
  console.log("LoadingScreenThing")
  store.commit("change", true)
  let result = null
  try{ result = await fun(...args)}
  catch(e){alert(e)}
  store.commit("change", false)
  return result;
}