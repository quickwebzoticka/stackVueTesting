<template>
    <div class="sidebar">
        <div class="side-menu">
            <router-link class="side-link" to="/">Home</router-link>
            <router-link class="side-link" to="/about">About</router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.sidebar {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 20vw;
    background: #FFFFFF;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 1000;
}
.side-menu {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
    width: 100%;
}
.side-link {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 20px;
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