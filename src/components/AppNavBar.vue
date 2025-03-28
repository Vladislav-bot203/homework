<template>
    <header>
        <h2>Freelance</h2>
        <ul>
            <li><router-link to="/tasks">Все задачи</router-link></li>
            <li><router-link to="/create-form">Создать</router-link></li>
        </ul>
    </header>
</template>

<script>
</script>

<style scoped lang="scss">
    header {
        display: flex;
        background-color: azure;
        padding: 5px 30px;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        display: flex;
        gap: 20px;
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .active {
        text-decoration: underline;
    }
</style>
