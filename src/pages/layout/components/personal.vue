<template>
    <rap-popover placement="bottom-end">
        <template #reference>
            <div class="head-logo h-full">
                <img :src="Logo" alt="">
            </div>
        </template>
        <div class="popover-body">
            dsadsa
        </div>
    </rap-popover>
</template>

<style lang="scss" scoped>
.head-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: coral;
        border-radius: 50%;
    }
}
</style>