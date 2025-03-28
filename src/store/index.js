import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      tasks: []
    }
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async loadTasks () {
      // const response = await fetch()
    }
  },
  modules: {
  }
})
