import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      count: 1
    }
  },
  getters: {
    getCounter: (state) => state.count,
  },
  mutations: {
    increment (state) { 
      state.count++
     },
  }
})