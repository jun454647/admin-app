<template>
    <rap-container class="home-wrap">
        <rap-crud :option="option" :data="data" v-model:page="page" @size-change="sizeChange">
            <template #menuLeft>
                <el-button>编辑</el-button>
            </template>
            <template #name1Header="{ column, index }">
                <span>{{ column.label }}--{{ index }}</span>
            </template>
            <template #nameExpand>
                dsadsa
            </template>
            <template #name2="{row, column, index}">
                <span>{{ row.name2 }} - {{ column.label }} - {{ index }}</span>
            </template>
            <template #footerMenuLeft>
                <el-button type="primary" plain>菜单</el-button>
            </template>
            <template #name7Search="{row}">
                <el-input v-model="row.name7" clearable>
                    <template #append>我的</template>
                </el-input>
            </template>
        </rap-crud>
    </rap-container>
</template>

<script setup lang="ts">

let initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const vlists:any = ref([]);

const nameLists:any = ref([]);
const option = {
    menu: true,
    index: true,
    selection: true,
    clearExclude: ['name'],
    column: [
        {
            label: '姓名',
            prop: 'name',
            search: true,
            type: 'select',
            searchValue: 1,
            dicData: [
                { label: '老陈', value: 1 },
                { label: '老陈2', value: 2 },
                { label: '老陈3', value: 3 },
                { label: '老陈4', value: 4 },
                { label: '老陈5', value: 5 }
            ]
            // expand: true,
        },
        {
            label: '姓名1',
            prop: 'name1',
            header: true,
            search: true,
            prepend: '$'
        },
        {
            label: '姓名2',
            prop: 'name2',
            slot: true,
            search: true,
            searchValue: 2,
            append: 'com',
            width: 300
        },
        {
            label: '姓名3',
            prop: 'name3',
            search: true,
            hide: true,
            max: 100,
            min: 10
        },
        {
            label: '姓名4',
            prop: 'name4',
            type: 'radio',
            search: true,
            searchValue: [2],
            multiple: true,
            multipleLimit: 3,
            dicData: [
                { label: '老王', value: 1 },
                { label: '老王2', value: 2 },
                { label: '老王3', value: 3 },
                { label: '老王4', value: 4 }
            ]
        },
        {
            label: '姓名5',
            prop: 'name5',
            type: 'select',
            dicData: nameLists || []
        },
        {
            label: '姓名6',
            prop: 'name6',
            type: 'radio',
            dicData: [
                { label: '老陈', value: 1 },
                { label: '老陈2', value: 2 },
                { label: '老陈3', value: 3 },
                { label: '老陈4', value: 4 },
                { label: '老陈5', value: 5 }
            ]
        },
        {
            label: '姓名7',
            prop: 'name7',
            type: 'select',
            search: true,
            searchSlot: true,
            dicData: nameLists || []
        },
        {
            label: '姓名8',
            prop: 'name8',
            type: 'date',
            format: 'YYYY/MM/ss',
            valueFormat: 'YYYY/MM/ss',
            search: true,
        },
        {
            label: '姓名9',
            prop: 'name9',
            type: 'datetime',
            format: 'YYYY/MM/ss mm:ss',
            valueFormat: 'YYYY/MM/ss mm:ss',
            search: true,
            dicData: nameLists || []
        },
        {
            label: '姓名10',
            prop: 'name10',
            type: 'datetimerange',
            startPlaceholder: 'start',
            endPlaceholder: 'end',
            search: true,
            dicData: nameLists || []
        },
        {
            label: '姓名11',
            prop: 'name11',
            type: 'number',
            search: true
        },
        {
            label: '姓名12',
            prop: 'name12',
            type: 'virtualized',
            search: true,
            filterable: true,
            dicData: vlists.value || [],
            remote: true,
            remoteMethod: (query: string) => {
                console.log('remoteMethod', query, vlists.value);
                vlists.value = vlists.value.filter((p:any) => p.label.includes(query)) || [];
            }
        },
    ],
    groups: [

    ]
};

const data = [{
    id: '1000001',
    name: 'cjq',
    name1: 'cjq1',
    name2: 'cjq2',
    name4: 2,
    name5: 1,
    name6: 4,
},{
    id: '1000002',
    name: 'cjq1',
    name1: 'cjq12',
    name2: 'cjq23',
    name4: 1,
    name5: 3,
    name6: 2,
}]

const page:any = ref({
    total: 100,
    current: 2,
    pageSize: 20,
});

onMounted(() => {
    setTimeout(() => {
        nameLists.value = [
            { label: '老李', value: 1 },
            { label: '老李2', value: 2 },
            { label: '老李3', value: 3 }
        ];
        for(let idx = 0; idx < 1000; idx++) {
            vlists.value.push({
                value: `Option ${idx + 1}`,
                label: `${initials[idx % 10]}${idx}`,
            });
        }
    }, 4000);
})

watch(() => page, (val) => {
    console.log('page----', val.value.pageSize);
}, { deep: true, immediate: true })

const sizeChange = (size: Number, done: Function) => {
    console.log(page.pageSize);
    done();
}
</script>

<style lang="scss" scoped>
</style>
