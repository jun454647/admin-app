<template>
    <div class="rap-toolbar">
        <el-button class="set-btn" type="primary" plain @click="drawer=true">
            <rap-icon icon="Setting"></rap-icon>
        </el-button>
        <el-button class="data-btn" type="primary" plain>
            <rap-icon icon="DataLine"></rap-icon>
        </el-button>

        <!-- toolbar config -->
        <el-drawer v-model="drawer"
            title="项目配置"
            :modal="false"
            :with-header="true"
            append-to-body
            lock-scroll
            custom-class="set-drawer">
            <div class="config-list">
                <div class="config-item bg-slate-100" v-for="item,i in configs" :key="i">
                    <div class="label"> {{ item.title }} </div>
                    <div class="content">
                        <!-- Layout -->
                        <div v-for="data, di in item.lists"
                            :key="di"
                            class="active-item"
                            :class="{ 'is-active': item.value === data.value }"
                            @click="changeLayout(item, data.value)">
                            <transition name="el-fade-in">
                                <div class="select" v-if="item.value === data.value"> <rap-icon icon="check" color="#fff" :size="13"></rap-icon> </div>
                            </transition>
                                
                            <!-- Layout -->
                            <template v-if="item.type == 'layout'">
                                <div class="layout">
                                    
                                </div>
                            </template>

                            <!-- 颜色 -->
                            <template v-if="item.type == 'color'">
                                <div class="color"></div>
                                <!-- <el-color-picker show-alpha @change="changeSetting(item, '', {})"/> -->
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div style="flex: auto">
                    <el-button>CANCEL</el-button>
                    <el-button type="primary">OK</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
const drawer = ref(false);
const configs = ref([
    {
        title: 'Layout',
        key: '',
        type: 'layout',
        value: '',
        lists: [
            { label: 'Admin', value: 'admin' },
            { label: 'Platform', value: 'platform' }
        ]
    },
    {
        title: 'Navbar',
        key: '',
        type: 'color',
        value: [],
        lists: [
            { label: 'Default', value: '' },
            { label: 'Dark', value: '' }
        ]
    },
    {
        title: 'Side menu',
        key: '',
        value: [],
        lists: [
            { label: 'V', value: 'V' },
            { label: 'V', value: 'V' }
        ]
    },
    {
        title: 'Side menu',
        key: '',
        value: [],
        lists: [
            { label: 'V', value: 'V' },
            { label: 'V', value: 'V' }
        ]
    },
    {
        title: 'Side menu',
        key: '',
        value: [],
        lists: [
            { label: 'V', value: 'V' },
            { label: 'V', value: 'V' }
        ]
    },
    {
        title: 'Side menu',
        key: '',
        value: [],
        lists: [
            { label: 'V', value: 'V' },
            { label: 'V', value: 'V' }
        ]
    },
    {
        title: 'Side menu',
        key: '',
        value: [],
        lists: [
            { label: 'V', value: 'V' },
            { label: 'V', value: 'V' }
        ]
    }
]);

const changeSetting = (item: Object, key: String, data: Object) => {
    
}

const changeLayout = (item: any, val: String) => {
    item.value = val;
}
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

    .el-drawer__header {
        font-weight: bold;
        color: #fff;
        margin: 0;
        background: var(--rp-drawer-header-bg-color);
        padding: var(--el-drawer-padding-primary);
    }

    .config-list {
        .config-item {
            display: flex;
            flex-direction: column;
            border-radius: 4px;
            background: rgba($color: #F3F6F9, $alpha: .5);
            margin-bottom: 10px;
            border: 1px solid var(--el-color-primary-light-1);
            .label {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 10px;
                height: 40px;
                background: rgba($color: #F3F6F9, $alpha: .6);
                border-radius: 4px;
                font-size: 14px;
            }
            .content {
                padding: 10px;
                border-top: 1px solid #F3F6F9;
                display: flex;
            }
        }
    }

    .active-item {
        position: relative;
        border: 1px solid transparent;
        margin-right: 10px;
        border-radius: var(--rp-border-radius-2);
        
        .select {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: scale(.8);
            transform-origin: 100% 0;
        }

        &.is-active {
            border-color: var(--rp-primary-color);
            box-shadow: var(--rp-box-shadow-4);
            transition: all .3s ease-in-out;
            background: #fff;
            .select {
                background: var(--rp-primary-color);
                border-radius: 0 var(--rp-border-radius-2) 0 var(--rp-border-radius-2);
                transition: all .3s ease-in-out;
            }
        }

        .layout {
            width: 80px;
            height: 55px;
        }

        .color {
            width: 30px;
            height: 30px;
        }
    }
}
</style>