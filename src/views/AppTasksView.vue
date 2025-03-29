<template>
    <div class="container">
        <h3>Всего активных задач: 1</h3>
        <div class="tasks-container">
            <div class="task" v-for="task in tasks" :key="task.id">
                <div class="task-header">
                    <h2>{{ task.title }}</h2>
                    <small class="_active">Активен</small>
                </div>
                <hr />
                <p>{{ task.date }}</p>
                <hr />
                <router-link to=""><button class="button">Посмотреть</button></router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup () {
    const store = useStore()
    store.dispatch('loadTasks')

    const tasks = computed(() => store.getters.tasks)

    return {
      tasks
    }
  }
}
</script>

<style scoped lang="scss">

.container {
    width: 100%;
}

h3 {
    color: whitesmoke;
}

.tasks-container {
    width: 100%;
}

.task {
    background-color: aliceblue;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    margin-top: 20px;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    color: white;
    background-color: rgb(111, 185, 111);
    padding: 8px;
    border-radius: 15px;
    border: none;

    &:hover {
        cursor: pointer
    }
}

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

</style>
