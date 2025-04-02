import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      tasks: [],
      title: '',
      date: '',
      text: '',
      alert: {
        type: 'error',
        message: '',
        name: '',
        visible: false
      }
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
    },
    getStatusName: (state) => (status) => {
      if (status === 'inactive') return 'Отменено'
      if (status === 'pending') return 'Выполняется'
      if (status === '_active') return 'Активно'
    },
    getActiveCount (state) {
      return state.tasks.reduce((sum, current) => {
        if (current.status === '_active') {
          return ++sum
        }
        return sum
      }, 0)
    },
    getAlertVisibility (state) {
      return state.alert.visible
    },
    getAlertName (state) {
      return state.alert.name
    },
    getAlertType (state) {
      return state.alert.type
    },
    getAlertMessage (state) {
      return state.alert.message
    }
  },
  mutations: {
    clearFields (state) {
      state.date = ''
      state.text = ''
      state.title = ''
    },
    closeAlert (state) {
      state.alert.message = ''
      state.alert.name = ''
      state.alert.type = ''
      state.alert.visible = false
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
        state.alert.message = error.message
        state.alert.type = 'error'
        state.alert.name = error.name
        state.alert.visible = true
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
          state.alert.message = error.message
          state.alert.type = 'error'
          state.alert.name = error.name
          state.alert.visible = true
        }
      }
    },
    async changeStatus ({ state }, payload) {
      try {
        const currentTask = payload.currentTask

        if (currentTask.status !== payload.changeTo) {
          if (new Date(currentTask.date) < new Date()) {
            currentTask.status = 'inactive'
            return
          }
          currentTask.status = payload.changeTo

          await fetch(`https://homework-project-669d4-default-rtdb.europe-west1.firebasedatabase.app/tasks/${currentTask.id}.json`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: payload.changeTo })
          })
        }
      } catch (error) {
        state.alert.message = error.message
        state.alert.type = 'error'
        state.alert.name = error.name
        state.alert.visible = true
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
