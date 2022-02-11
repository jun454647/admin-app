<template>
    <div class="home-wrap" @click="$router.push({ path: '/data' })">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const radio1: any = ref('')
</script>

<style lang="scss" scoped>
.home-wrap {
    height: 1800px;
}
</style>
