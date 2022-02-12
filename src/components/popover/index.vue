<template>
    <div class="popover-index" ref="popover">
        <span @click="show"><slot name="reference"></slot></span>
        <div v-show="showPopover" class="rap-popover"
            :style="`width: ${width}px; padding: ${gutter};`"
            :class="[`${placement}`]">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const showPopover = ref(false);
const popover = ref(null);
const props = defineProps({
    visible: Boolean,
    width: Number,
    gutter: {
        type: String,
        default: '10px'
    },
    placement: {
        type: String,
        default: 'bottom-start'
    },
    disabled: Boolean
})

// 展示popover
const show = () => {
    if (!props.disabled) {
        showPopover.value = true;
    }
}

watch(() => props.visible, (nval, oval) => {
    showPopover.value = nval;
})

onMounted(() => {
    // 点击其他区域消失弹窗
    onClickOutside(popover.value, (event) => {
        showPopover.value = false;
    })
})
</script>

<style lang="scss" scoped>
.popover-index {
    position: relative;
    display: inline-block;

    .rap-popover {
        position: absolute;
        min-width: 100px;
        background: white;
        box-shadow: var(--rp-box-shadow);
        border-radius: var(--rp-border-radius-2);
        transform: translateY(40px);
        opacity: 0;
        animation: fadeInUp .4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;

        &.bottom-start {
            top: 100%;
            left: 0;
        }
        &.bottom-end {
            right: 0;
            top: 100%;
        }

        &.top {
            top: 0;
        }
    }
}

@keyframes fadeInUp {
    0% {
        opacity: 0.3;
        transform: translateY(40px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}
</style>