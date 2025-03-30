<template>
    <div class="task-container">
        <h1>{{ currentTask.title }}</h1>
        <p>Статус: <small :class="currentTask.status">Завершен</small></p>
        <p><strong>Дедлайн:</strong> {{ currentTask.date }}</p>
        <p>Описание: {{ currentTask.text }}</p>
        <div class="btns-container">
            <button class="button primary" @click="changeStatus({ changeTo: 'pending', currentTask })">Взять в работу</button>
            <button class="button success" @click="changeStatus({ changeTo: 'inactive',  currentTask })">Завершить</button>
            <button class="button error" @click="changeStatus({ changeTo: '_active',  currentTask })">Отменить</button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()

    const currentTask = computed(() => {
      return store.getters.tasks.find((e) => e.id === route.params.id)
    })

    const changeStatus = (payload) => {
      store.dispatch('changeStatus', payload)
    }
    return {
      currentTask,
      changeStatus
    }
  }
}
</script>

<style lang="scss" scoped>
small {
    border-radius: 5px;
    padding: 3px;
}

._active {
    border: 1px solid rgb(80, 161, 80);
    color: rgb(80, 161, 80);
}

.inactive {
    border: 1px solid rgb(212, 69, 69);
    color: rgb(212, 69, 69);
}

.pending {
    border: 1px solid rgb(142, 165, 60);
    color: rgb(142, 165, 60);
}

.task-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: azure;
    border-radius: 10px;
}

.btns-container {
    display: flex;
    gap: 15px;
}

.button {
    padding: 7px 10px;
    border-radius: 7px;

    &:hover {
        cursor: pointer;
    }
}

.primary {
    background-color: azure;
    color: rgb(77, 170, 77);
    border: 1px solid rgb(77, 170, 77);
}

.loader {
    margin: 30px auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.success {
    background-color: rgb(77, 170, 77);
    color: azure;
    border: 0;
}

.error {
    background-color: rgb(193, 70, 70);
    color: azure;
    border: 0;
}
</style>
