<template>
    <div class="alert-container" :class="alertType">
        <h1>{{ alertHeader }}</h1>
        <p>{{ alertMessage }}</p>
        <button @click="close">Закрыть</button>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup () {
    const store = useStore()

    const close = function () {
      store.commit('closeAlert')
    }

    const alertHeader = computed(() => {
      return store.getters.getAlertName
    })

    const alertMessage = computed(() => {
      return store.getters.getAlertMessage
    })

    const alertType = computed(() => {
      return store.getters.getAlertType
    })
    return {
      close,
      alertHeader,
      alertMessage,
      alertType
    }
  }
}
</script>

<style lang="scss" scoped>
    .alert-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 8px 15px;
        background-color: azure;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .error {
        border-left: 3px solid rgb(211, 108, 108);
        color: rgb(211, 108, 108);
    }

    button {
        width: 100px;
        padding: 10px;
        box-sizing: border-box;
        border: 0px;
        border-radius: 7px;
        background-color: rgb(226, 81, 81);
        color: azure;

        &:hover {
            cursor: pointer;
        }
    }
</style>
