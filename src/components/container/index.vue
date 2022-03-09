<template>
    <el-card class="base-container" :body-style="{ padding: '10px' }">
        <slot></slot>
    </el-card>
</template>

<style lang="scss" scoped>
.base-container {
    margin: 10px;
}
</style>