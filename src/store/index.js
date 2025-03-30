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
    },
    getStatus (state, id) {
      return state.tasks.find((e) => e.id === id).status
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
          date: state.date,
          status: (new Date(state.date) - new Date()) > 0 ? '_active' : 'inactive'
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
    async loadTasks ({ state, dispatch }) {
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

          await dispatch('checkStatus')
        } catch (error) {
          console.log(error)
        }
      }
    },
    async changeStatus ({ state }, payload) {
      const currentTask = payload.currentTask

      if (currentTask.status !== payload.changeTo) {
        currentTask.status = payload.changeTo

        const res = await fetch(`https://homework-project-669d4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentTask.id}.json`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: payload.changeTo })
        })
        console.log(res)
      }
    },
    async checkStatus ({ state, dispatch }) {
      for await (const task of state.tasks) {
        if (new Date(task.date) - new Date() <= 0) {
          await dispatch('changeStatus', { changeTo: 'inactive', currentTask: task })
        }
      }
    }
  }
})
