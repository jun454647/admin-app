<template>
    <div class="rap-toolbar">
        <el-button class="set-btn" type="primary" plain size="mini" @click="drawer=true">
            <rap-icon icon="Setting"></rap-icon>
        </el-button>
        <el-button class="data-btn" type="primary" plain size="mini">
            <rap-icon icon="DataLine"></rap-icon>
        </el-button>

        <!-- toolbar config -->
        <el-drawer v-model="drawer"
            title="I am the title"
            :modal="true"
            :with-header="false"
            append-to-body
            lock-scroll
            custom-class="set-drawer">
            
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
const drawer = ref(false);
</script>

<style lang="scss" scoped>
.rap-toolbar {
    position: fixed;
    top: 30%;
    right: 0;
    z-index: 5;
    padding: 10px 8px;
    border-radius: var(--rp-border-radius) 0 0 var(--rp-border-radius) ;
    box-shadow: 0px 0px 50px 0px rgba(82, 63, 105, .15);
    display: flex;
    flex-direction: column;
    background: white;

    .el-button {
        margin: 0;
        padding: 0;
        width: 32px;
        border-color: transparent;
        &:not(:last-of-type) {
            margin-bottom: 7px;    
        }
        :deep(.el-icon) {
            font-size: 18px;
        }
        &.set-btn :deep(.el-icon) {
            display: inline-block;
            animation: rotate 2s linear infinite;
        }

        &.data-btn :deep(.el-icon) {
            animation: scale 2s ease-in-out infinite;
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes scale {
    0% {
        transform: scale(1);
    }
    25% {
        transform: scale(1.1);
    }
    50% {
        transform: scale(1);
    }
    75% {
        transform: scale(.9);
    }
    100% {
        transform: scale(1);
    }
}

</style>

<style lang="scss">
.el-drawer.set-drawer {
    top: 10px;
    bottom: 10px;
    right: 10px;
    height: calc(100% - 20px);
    border-radius: var(--rp-border-radius);
}
</style>