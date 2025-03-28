<template>
    <form @submit.prevent="submit">
        <h1>Создать новую задачу</h1>
        <label for="task-name">Название</label>
        <input type="text" id="task-name" v-model="title">
        <label for="date">Дата дедлайна</label>
        <input type="date" id="date" v-model="date">
        <label for="description">Описание</label>
        <textarea id="description" v-model="text"></textarea>
        <button type="submit" :class="isValid ? 'active' : 'inactive'">Создать</button>
    </form>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const title = ref('')
    const date = ref('')
    const text = ref('')
    const store = useStore()

    const isValid = computed(() => title.value.length !== 0 && date.value.length !== 0 && text.value.length !== 0)

    const submit = () => {
      store.state.tasks.push({
        title: title.value,
        date: date.value,
        text: text.value
      })
      title.value = ''
      date.value = ''
      text.value = ''
    }

    return {
      isValid,
      title,
      date,
      text,
      submit
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
