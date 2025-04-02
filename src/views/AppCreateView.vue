<template>
    <app-alert v-if="isVisible"></app-alert>
    <form @submit.prevent="$store.dispatch('pushToDatabase')">
        <h1>Создать новую задачу</h1>
        <label for="task-name">Название</label>
        <input type="text" id="task-name" v-model="$store.state.title">
        <label for="date">Дата дедлайна</label>
        <input type="date" id="date" v-model="$store.state.date">
        <label for="description">Описание</label>
        <textarea id="description" v-model="$store.state.text"></textarea>
        <button type="submit" :class="isValid ? 'active' : 'inactive'">Создать</button>
    </form>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import AppAlert from '@/components/AppAlert.vue'

export default {
  components: { AppAlert },
  setup () {
    const store = useStore()

    const isValid = computed(() => {
      return store.getters.isValid
    })

    const isVisible = computed(() => store.getters.getAlertVisibility)

    return {
      isValid,
      isVisible
    }
  }
}
</script>

<style scoped lang="scss">
    form {
        border-radius: 10px;
        background-color: aliceblue;
        display: flex;
        flex-direction: column;
        padding: 15px;
        box-sizing: border-box;
    }

    textarea {
        resize: none;
        width: 100%;
        height: 200px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    label {
        margin-top: 20px;
    }

    input {
        width: 100%;
        border-radius: 10px;
        height: 25px;
        box-sizing: border-box;
    }

    button {
        margin: 20px 0;
        width: 20%;
        padding: 8px;
        border-radius: 10px;
        border: 0px;
        color: white;
    }

    .inactive {
        background-color: rgb(187, 180, 180);
        pointer-events: none;
    }

    .active {
        background-color: rgb(131, 187, 131);
        &:hover {
            cursor: pointer;
        }
    }
</style>
