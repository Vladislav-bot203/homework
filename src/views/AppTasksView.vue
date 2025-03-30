<template>
    <div v-if="loading" class="loader">
        <app-loader></app-loader>
    </div>
    <div v-else>
        <div class="container" v-if="isTasksPath">
        <h3>Всего активных задач: 1</h3>
        <div class="tasks-container">
            <div class="task" v-for="task in tasks" :key="task.id">
                <div class="task-header">
                    <h2>{{ task.title }}</h2>
                    <small :class="task.status">{{
                    task.status === '_active' ?
                    'Активно'
                    : task.status === 'inactive' ?
                    'Отменено'
                    : 'Выполняется'
                    }}</small>
                </div>
                <hr />
                <p>{{ task.date }}</p>
                <hr />
                <router-link :to="`/tasks/${task.id}`"><button class="button">Посмотреть</button></router-link>
            </div>
        </div>
    </div>
    <router-view></router-view>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'

export default {
  components: { AppLoader },
  setup () {
    const store = useStore()
    const route = useRoute()
    const loading = ref(true)

    onMounted(async () => {
      await store.dispatch('loadTasks')
      loading.value = false
    })

    const tasks = computed(() => store.getters.tasks)
    const isTasksPath = computed(() => route.path === '/tasks' || route.path === '/')

    return {
      tasks,
      isTasksPath,
      loading
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

.loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
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
