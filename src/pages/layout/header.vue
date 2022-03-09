<template>
    <div class="rap-header">
        <div class="l-wrap h-full">
            l
        </div>
        <div class="r-wrap h-full">
            
            <!-- 个人信息 -->
            <personal class="h-full"></personal>
        </div>
    </div>
</template>

<script setup lang="ts">
import personal from "@/pages/layout/components/personal.vue"

</script>

<style lang="scss" scoped>
.rap-header {
    background: white;
    height: var(--rp-header-height);
    width: 100%;
    position: sticky;
    left: 0;
    top: 0;
    z-index: 9;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--rp-box-shadow);
}
</style>