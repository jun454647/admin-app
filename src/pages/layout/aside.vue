<template>
<!-- display default collaspe -->
    <div class="rap-aside" :class="{ 'collapse': store.collapse }">
        <div class="logo-wrap">
            logo
            <!-- 折叠按钮 -->
            <div class="collapse-btn" @click="doCollapse">
                <rap-icon :class="{ show: store.collapse }" icon="DArrowLeft"></rap-icon>
                <rap-icon :class="{ show: !store.collapse }" icon="DArrowRight"></rap-icon>
            </div>
        </div>
        <div class="menu-wrap">

        </div>
    </div>
</template>

<script setup lang="ts">
import { useConfig } from "@store/config";

const store = useConfig();
const doCollapse = () => {
    store.setCollapse(!store.collapse);
}

</script>

<style lang="scss" scoped>
.rap-aside {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    height: 100vh;
    color: #a2a3b7;
    width: var(--rp-aside-width);
    background: var(--rp-aside-bg-color);
    transition: all .2s ease-in-out;

    &.collapse {
        width: var(--rp-aside-collapse-width);
        transition: all .3s ease-in-out;
    }

    .logo-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--rp-header-height);
        background: var(--rp-aside-bg-color);
        position: relative;

        .collapse-btn {
            position: absolute;
            right: 10px;
            margin: auto;
            height: 20px;
            display: flex;
            .el-icon {
                position: absolute;
                right: 0;
                opacity: 0;
                transform: translateX(15px);
                transition: all .5s ease-in-out;
                &.show {
                    opacity: 1;
                    transform: translateX(0);
                    transition: all .5s ease-in-out;
                }
            }
        }
    }

    .menu-wrap {
        height: calc(100vh - var(--rp-header-height));
        background: var(--rp-aside-menu-bg-color);
    }
}
</style>