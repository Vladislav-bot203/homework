import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      tasks: [],
      title: '',
      date: '',
      text: ''
    }
  },
  getters: {
    isValid (state) {
      return state.title.length !== 0 && state.date.length !== 0 && state.text.length !== 0
    },
    tasks (state) {
      return state.tasks
    }
  },
  mutations: {
    clearFields (state) {
      state.date = ''
      state.text = ''
      state.title = ''
    }
  },
  actions: {
    async pushToDatabase ({ state, commit }) {
      try {
        const dataToSave = {
          text: state.text,
          title: state.title,
          date: state.date
        }

        const data = await fetch('https://homework-project-669d4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSave)
        })

        const response = await data.json()

        state.tasks.push({
          id: response.name,
          ...dataToSave
        })

        commit('clearFields')
      } catch (error) {
        commit('clearFields')
      }
    },
    async loadTasks ({ state }) {
      if (state.tasks.length === 0) {
        try {
          const data = await fetch('https://homework-project-669d4-default-rtdb.europe-west1.firebasedatabase.app/tasks.json')
          const response = await data.json()

          state.tasks = Object.keys(response).map((key) => {
            return {
              id: key,
              ...response[key]
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
})
