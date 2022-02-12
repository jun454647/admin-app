<template>
    <div class="home-wrap">
        <rap-popover>
            <template #reference>
                <el-button type="primary">Primary</el-button>
            </template>
            <el-table :data="tableData" border>
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" width="240"/>
            </el-table>
        </rap-popover>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const radio1: any = ref('')
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    }
]

</script>

<style lang="scss" scoped>
.home-wrap {
    height: 1800px;
}
</style>
