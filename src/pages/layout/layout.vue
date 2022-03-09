<template>
    <div class="rap-container" :class="{ 'collapse': store.collapse }">
        <RPAside class="animate__animated animate__fadeIn"/>
        <div style="position: relative;">
            <RPHeader />
            <div class="rap-main w-full">
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>

        <!-- 工具 -->
        <RPToolbar v-if="website.toolbar" class="animate__animated animate__fadeInRight"/>

        <!-- Back top -->
        <el-backtop />
    </div>
</template>

<script setup lang="ts">
import RPAside from "./aside.vue"
import RPHeader from "./header.vue"
import RPToolbar from "./toolbar.vue"
import website from "@/config/website"

import { useConfig } from "@store/config";

const store = useConfig();

</script>

<style lang="scss" scoped>
.rap-container {
    padding-left: var(--rp-aside-width);
    transition: all .3s ease-in-out;

    &.collapse {
        padding-left: var(--rp-aside-collapse-width);
        transition: all .3s ease-in-out;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>