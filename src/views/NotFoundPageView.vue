<template>
    <div class="container">
        <h1>The page you are searching for doesn't exist</h1>
        <router-link to="/tasks">Go back to tasks page</router-link>
    </div>
</template>

<script>
export default {
  name: 'NotFoundPageView'
}
</script>

<style scoped lang="scss">

.container {
    background-color: azure;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 15px;
}
</style>
