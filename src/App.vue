
<template>
    <router-view v-slot="{ Component }">
        <transition name="el-fade-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: $mainColor;
}
</style>
