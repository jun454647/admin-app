<template>
    <el-icon :style="{ fontSize: size + 'px' }" :color="color">
        <component :is="icon"></component>
    </el-icon>
</template>

<script setup lang="ts">
const props = defineProps({
    icon: String,
    size: {
        type: Number,
        default: 20
    },
    color: String
})
</script>