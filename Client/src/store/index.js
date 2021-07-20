import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      loading: false,
      count: 0
    }
  },
  getters: {
    isLoading: (state) => state.loading,
    getCounter: (state) => state.count,
  },
  mutations: {
    change (state, thing) { 
      state.loading = thing
     },
     increment (state) {
       state.count += 1
     }
  }
})