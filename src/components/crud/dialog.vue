<template>
    <el-dialog class="rap-dialog"
        v-model="modelValue"
        :title="option.dialogTitle"
        :width="option.dialogWidth"
        :fullscreen="option.dialogFullscreen"
        :top="option.dialogTop"
        :modal="option.dialogModal">
        
    </el-dialog>
</template>

<script lang="ts" setup>
defineProps({
    option: {
        type: Object,
        default: {}
    },
    modelValue: Boolean,
})
</script>