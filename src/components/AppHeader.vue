<template>
    <div class="header">
        <router-link class="header-link" to="/">Home</router-link>
        <router-link class="header-link" to="/about">About</router-link>
        <div class="counter">{{ $store.state.counter }}</div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.header {
    padding: 20px;
    background: #DDD;
    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
}
.header-link {
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s ease;
    background: #3eaf7c;
    color: #FFFFFF;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid transparent;
}
.router-link-exact-active {
    background: #FFFFFF;
    border: 1px solid #3eaf7c;
    color: #3eaf7c;
}
</style>