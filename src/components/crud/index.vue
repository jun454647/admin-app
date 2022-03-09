<template>
    <div class="rap-crud">
        <!-- 搜索 -->
        <el-collapse-transition>
            <div class="rap-crud__search" v-show="showSearch">
                <el-form ref="searchFormRef" :model="searchForm" label-width="0" inline>
                    <el-form-item v-for="item in search_columns"
                        :key="item"
                        :prop="item.prop"
                        :label="item.label"
                        :label-width="item.labelWidth"
                        :show-message="item.showMessage">
                        <template v-if="item.searchSlot">
                            <div class="input-width">
                                <slot :name="`${item.prop}Search`" :row="searchForm"></slot>
                            </div>
                        </template>
                        <template v-else-if="['select', 'radio', 'checkbox'].includes(item.type)">
                            <el-select class="input-width"
                                v-model="searchForm[item.prop]"
                                :placeholder="item.label"
                                :multiple="item.multiple"
                                :multiple-limit="item.multipleLimit"
                                :collapse-tags="item.multiple"
                                popper-class="search-popper"
                                clearable>
                                <el-option v-for="data in getColumnLists(item.prop)"
                                    :key="data"
                                    :label="data[item.labelKey || 'label']"
                                    :value="data[item.valueKey || 'value']"
                                    :disabled="data.disabled">
                                </el-option>
                            </el-select>
                        </template>
                        <template v-else-if="['virtualized'].includes(item.type)">
                            <el-select-v2 class="input-width"
                                v-model="searchForm[item.prop]"
                                :multiple="item.multiple"
                                :disabled="item.disabled"
                                :value-key="item.valueKey"
                                :clear-icon="item.clearIcon"
                                :collapse-tags="item.multiple"
                                :multiple-limit="item.multipleLimit"
                                :placeholder="item.label"
                                :filterable="item.filterable"
                                :remote="item.remote"
                                :remote-method="item.remoteMethod"
                                :height="item.height"
                                :options="getColumnLists(item.prop)"
                                popper-class="search-popper"
                                clearable>
                            </el-select-v2>
                        </template>
                        <template v-else-if="['year', 'month', 'date', 'dates', 'datetime', 'week', 'datetimerange', 'daterange', 'monthrange'].includes(item.type)">
                            <el-date-picker class="input-width"
                                v-model="searchForm[item.prop]"
                                :editable="item.editable"
                                :disabled="item.disabled"
                                :placeholder="item.label"
                                :type="item.type"
                                :format="item.format"
                                :value-format="item.valueFormat"
                                :prefix-icon="item.prefixIcon"
                                :clear-icon="item.clearIcon"
                                :start-placeholder="item.startPlaceholder"
                                :end-placeholder="item.endPlaceholder"
                                :range-separator="item.rangeSeparator"
                                clearable>
                            </el-date-picker>
                        </template>
                        <template v-else-if="['number'].includes(item.type)">
                            <el-input-number class="input-width"
                                v-model="searchForm[item.prop]"
                                :min="item.min"
                                :max="item.max"
                                :step="item.step"
                                :step-strictly="item.stepStrictly"
                                :precision="item.precision"
                                :disabled="item.disabled"
                                :placeholder="item.label"
                                :label="item.label"
                                controls-position="right">
                            </el-input-number>
                        </template>
                        <template v-else>
                            <template v-if="['autocomplete'].includes(item.type)">
                                <el-autocomplete class="input-width"
                                    v-model="searchForm[item.prop]"
                                    :placeholder="item.label"
                                    :trigger-on-focus="item.triggerOnFocus"
                                    :disabled="item.disabled"
                                    :prefix-icon="item.prefixIcon"
                                    :suffix-icon="item.suffixIcon"
                                    :fetch-suggestions="item.FetchSuggestion"
                                    :value-key="item.valueKey"
                                    :debounce="item.debounce"
                                    :placement="item.placement"
                                    :select-when-unmatched="item.selectUnmatched"
                                    :label="item.label"
                                    :hide-loading="item.hideLoading"
                                    @select="item.inputSelect">
                                </el-autocomplete>
                            </template>
                            <el-input v-else
                                class="input-width"
                                v-model="searchForm[item.prop]"
                                :placeholder="item.label"
                                :maxlength="item.maxlength"
                                :minlength="item.minlength"
                                :disabled="item.disabled"
                                :prefix-icon="item.prefixIcon"
                                :suffix-icon="item.suffixIcon"
                                :show-word-limit="item.showWordLimit"
                                :rows="item.rows"
                                :autofocus="item.autofocus"
                                :autosize="item.autosize"
                                @select="item.inputSelect"
                                clearable>
                                <template v-if="item.prepend" #prepend>{{ item.prepend }}</template>
                                <template v-if="item.append" #append>{{ item.append }}</template>
                            </el-input>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="rapOption.searchBtn" type="primary" :icon="Search" @click="doSearchForm">搜索</el-button>
                        <el-button v-if="rapOption.resetBtn" type="danger" :icon="Delete" plain @click="doResetSearchForm">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-collapse-transition>

        <!-- 列表 -->
        <div class="rap-crud__body">
            <!-- 按钮 -->
            <div class="rap-crud__menu">
                <div class="l-menu">
                    <el-button :icon="Plus" type="primary" v-if="rapOption.addBtn">新增</el-button>
                    <slot name="menuLeft"></slot>
                </div>
                <div class="r-menu">
                    <el-tooltip effect="customized" content="Search" placement="top" v-if="rapOption.searchBtn">
                        <el-button style="min-width: 32px;" :icon="Search" circle :type="!showSearch?'primary':''" @click="showSearch=!showSearch"></el-button>
                    </el-tooltip>
                    <el-tooltip effect="customized" content="Refresh" placement="top" v-if="rapOption.refreshBtn">
                        <el-button style="min-width: 32px;" :icon="Refresh" circle></el-button>
                    </el-tooltip>
                    <el-tooltip effect="customized" content="Printer" placement="top" v-if="rapOption.printerBtn">
                        <el-button style="min-width: 32px;" :icon="Printer" circle></el-button>
                    </el-tooltip>
                    <el-tooltip effect="customized" content="Export" placement="top" v-if="rapOption.exportBtn">
                        <el-button style="min-width: 32px;" :icon="Download" circle></el-button>
                    </el-tooltip>
                </div>
            </div>
            <!-- 列表 -->
            <div class="rap-crud__table">
                <el-table ref="rapTable"
                    :data="data"
                    :height="rapOption.height"
                    :max-height="rapOption.maxHeight"
                    :row-key="rapOption.rowKey"
                    :show-header="rapOption.showHeader"
                    :empty-text="rapOption.emptyText"
                    :sum-text="rapOption.sumText"
                    border
                    stripe
                    @selection-change="selectionChange">
                    <el-table-column v-if="rapOption.index" type="index" label="#" fixed align="center"></el-table-column>
                    <el-table-column v-if="rapOption.selection" type="selection" fixed align="center"></el-table-column>
                    <template v-for="col in tableColumns" :key="col">
                        <!-- expand -->
                        <el-table-column v-if="col.expand" type="expand">
                            <slot :name="`${col.prop}Expand`"></slot>
                        </el-table-column>
                        <el-table-column v-else
                            :prop="col.prop"
                            :label="col.label"
                            :width="col.width"
                            :min-width="col.minWidth"
                            :fixed="col.fixed"
                            :show-overflow-tooltip="col.tooltip">
                            <template v-if="col.header" #header="{ column, $index }">
                                <slot :name="`${col.prop}Header`" :column="column" :index="$index"></slot>
                            </template>
                            <template v-if="col.slot" #default="{ row, column, $index }">
                                <slot :name="`${col.prop}`" :row="row" :column="column" :index="$index"></slot>
                            </template>
                            <template v-else-if="col.type == 'select' || col.type == 'checkbox' || col.type == 'radio'" #default="{ row }">
                                <span>{{ filterLabelFromList(col.prop, row[col.prop]) || '' }}</span>
                            </template>
                        </el-table-column>
                    </template>
                    <!-- 操作列 -->
                    <el-table-column v-if="rapOption.menu"
                        :label="rapOption.menuLabel || '操作'"
                        :width="rapOption.menuWidth || '200'"
                        :fixed="rapOption.menuFixed || 'right'"
                        :align="rapOption.menuAlign || 'center'">
                        <template #default="{ row, $index }">
                            <div class="menu-btn__wrap">
                                <el-button v-if="rapOption.viewBtn" type="text" :icon="View" @click="doOperationBtn('view', row, $index)">查看</el-button>
                                <el-button v-if="rapOption.editBtn" type="text" :icon="Edit" @click="doOperationBtn('edit', row, $index)">编辑</el-button>
                                <el-button v-if="rapOption.deleteBtn" class="delete" type="text" :icon="Delete" @click="doOperationBtn('delete', row, $index)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="rap-crud__page">
                <span><slot name="footerMenuLeft"></slot></span>
                <el-pagination v-model:currentPage="page.current"
                    v-model:page-size="page.pageSize"
                    :page-sizes="page.pageSizes || [10, 15, 20, 50, 100]"
                    :total="page.total"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :hide-on-single-page="page.total == 1"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>

        <!-- 新增|编辑|查看 -->
        <!-- <rap-dialog v-model="dialog.show" :option="rapOption"></rap-dialog> -->
    </div>
</template>

<script setup lang="ts">
import RapDialog from "@/components/crud/dialog.vue";

import { Plus, Refresh, Printer, Download, Edit, Delete, View, Search } from '@element-plus/icons-vue';

const props = defineProps({
    option: {
        type: Object,
        default:() => {
            return {
                tableMenu: false 
            }
        }
    }, // 配置属性
    data: Object, // 列表数据
    value: Object, // 表单
    index: Boolean, // 列表序号
    selection: Boolean, // 列表选择
    page: {
        type: Object,
        default: {
            background: true
        }
    }, // 分页
    search: Object, // 搜索表单
    beforeOpen: Function, // 会暂停Dialog的打开 function(done,type)
    beforeClose: Function, // 会暂停Dialog的关闭 function(done,type)
    permission: Object, // 按钮权限控制
});

// Emits
const emit = defineEmits([
    'sizeChange',
    'currentChange',
    'update:page',
    'search-reset',
    'search-chanage',
    'selection-change'
]);

// 搜索----------------------------
const showSearch:any = ref(true);
const searchForm:any = ref({});
const search_columns:any = ref([]);
const dealSearchForm = (option:any) => {
    search_columns.value = [];
    (option.column || []).map((p:any) => {
        if (p.search) {
            searchForm.value[p.prop] = p.searchValue || '';
            search_columns.value.push(p);
        }
    })
};

// 搜索
const doSearchForm = () => {
    console.log('searchForm2', searchForm.value);
    emit('search-chanage', searchForm.value);
}

// 搜索重置
let searchFormRef:any = ref(null);
const doResetSearchForm = () => {
    Object.keys(searchForm.value).map(key => {
        if (!rapOption.value.clearExclude.includes(key)) {
            delete searchForm.value[key];
        }
    });
    searchFormRef.value && searchFormRef.value.resetFields();
    emit('search-reset', searchForm.value);
};

// 处理数据 1.处理需要接口；2.处理列表
const columnDict:any = ref([]);
const dealColumnGroups = (option:any) => {
    if (option.column) dealColumnDicts(option.column);
    if (option.groups) {
        option.groups.map((group:any) => {
            dealColumnDicts(group.column || []);
        })
    }
};

const dealColumnDicts = (lists:Array<any>) => {
    lists.map(p => {
        if (['select', 'checkbox', 'radio', 'virtualized'].includes(p.type) && !columnDict.value.find((d:any) => d.prop == p.prop)) {
            if (p.dicData) {
                columnDict.value.push({ prop: p.prop, lists: p.dicData, labelKey: p.labelKey || 'label', vlaueKey: p.vlaueKey || 'value' });
            } else if (p.dicUrl){
                // 接口请求
                
            }
        }
    })
}

const filterLabelFromList = (key: String, value: any) => {
    let label:String = '';
    columnDict.value.map((p:any) => {
        if (p.prop == key) {
            const data:any = (p.lists || []).find((t:any) => t[p.vlaueKey || 'value'] == value);
            label = data ? data[p.labelKey || 'label'] : '';
        }
    })
    return label || value;
};

// 配置默认属性
const rapOption:any = computed(() => {
    const defaultOption = {
        refreshBtn: true,
        printerBtn: true,
        exportBtn: true,
        addBtn: true,
        editBtn: true,
        viewBtn: true,
        deleteBtn: true,
        searchBtn: true,
        resetBtn: true,
        rowKey: 'id', // 列表标识
        clearExclude: [],
    }
    return Object.assign(defaultOption, props.option);
});

// 获取列表可显示的列
const tableLoading:any = ref(false);
const tableColumns = computed(() => {
    return props.option.column.filter(p => !p.hide);
})

const getColumnLists = (key:String) => {
    let lists:any = [];
    columnDict.value.map((p:any) => {
        if (p.prop == key) {
            lists = (p.lists || []);
        }
    });
    // console.log('lists:', lists);
    return lists;
}
// 列表事件-----------------------------
// 刷新列表
const refreashList = () => {

};
const selectionChange = (selection:any) => {
    emit('selection-change', selection);
};

/**
 * 列表操作按钮
 * type: view|edit|delete
 * row: 操作行数据
 * index: 操作行列表下标
 */
const doOperationBtn = (type: String, row: any, index: any) => {
    dialog.value = { type, row, index, show: true };
}

// 分页事件---------------------
const handleSizeChange = (val: Number) => {
    emit('update:page', Object.assign(props.page, { pageSize: val }));
    emit('sizeChange', val, () => {
        console.log('sizeChange--done');
    });
}

const handleCurrentChange = (val: Number) => {
    emit('update:page', Object.assign(props.page, { current: val }));
    emit('currentChange', val, () => {
        console.log('currentChange--done');
    });
}

// Dialog --------------------------
const dialog = ref({
    show: false,
    type: ''
})

// 监听配置数据
watch(() => props.option, (nval, oval) => {
    // 处理搜索内容
    dealSearchForm(nval);

    // 处理Dict
    dealColumnGroups(nval);
}, { immediate: true, deep: true });

</script>

<style lang="scss" scoped>
.rap-crud {
    .rap-crud__search {
        :deep(.el-form-item) {
            margin-bottom: 10px;
            margin-right: 5px;
            .el-form-item__label {
                display: none;
            }
            .el-tag.el-tag--info.is-hit {
                border-color: #ebeef5;
            }
            .el-tag .el-tag__close {
                &:hover {
                    background: var(--el-color-danger);
                }
            }
            .el-input-group__append, .el-input-group__prepend {
                font-size: 12px;
                padding: 0 10px;
                min-width: 40px;
                box-sizing: border-box;
                text-align: center;
            }
            
            .el-select-v2__placeholder,
            .el-input__inner {
                font-size: 12px;
            }
            
            .el-input-number {
                .el-input__inner {
                    text-align: left;
                }
                .el-input-number__increase {
                    top: 2px;
                }
            }
            
        }

        :deep(.input-width) {
            width: 160px !important;
        }
    }
    .rap-crud__body {

        .rap-crud__menu {
            margin-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .rap-crud__table {
            margin-bottom: 10px;
            :deep(.el-table th.el-table__cell) {
                background: var(--el-bg-color);
            }

            :deep(.el-table__cell) {
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 12px;
            }

            .menu-btn__wrap {
                :deep(.el-button) {
                    height: auto;
                    padding-top: 3px;
                    padding-bottom: 3px;
                    &.delete:hover:not(.is-disabled) {
                        color: var(--el-color-danger);
                    }
                }
            }
        }

        .rap-crud__page {
            padding: 5px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }

    :deep(.el-button) {
        font-size: 12px;
    }
    :deep(.el-button+.el-button) {
        margin-left: 8px;
    }
}

</style>

<style lang="scss">

.el-popper.search-popper {
    .el-select-dropdown__option-item,
    .el-select-dropdown__item {
        font-size: 12px;
        padding: 0 10px;
    }
}

.el-popper.is-customized {
    color: white;
    /* Set padding to ensure the height is 32px */
    background: var(--rp-aside-bg-color);
    box-shadow: var(--rp-box-shadow-3);
}

.el-popper.is-customized .el-popper__arrow::before {
    background: var(--rp-aside-bg-color);
}
</style>