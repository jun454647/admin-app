<template>
    <el-form v-bind="$attrs">
        <el-row :gutter="gutter">
            <el-col :span="span">
                
            </el-col>
        </el-row>
    </el-form>
</template>

<script setup lang="ts">
defineProps({
    column: Array,
    model: Object, // 表单数据对象
    rules: Object, // 表单验证规则
    inline: Boolean, // 行内表单模式
    labelPosition: String, // 表单域标签的位置
    labelWidth: [String, Number], // 表单域标签的宽度
    labelSuffix: Boolean, // 表单域标签的后缀
    hideRequiredAsterisk: Boolean, // 是否显示必填字段的标签旁边的红色星号
    showMessage: Boolean, // 是否显示校验错误信息
    inlineMessage: Boolean, // 是否以行内形式展示校验信息
    statusIcon: Boolean, // 是否在输入框中显示校验结果反馈图标
    validateOnRuleChange: Boolean, // 是否在 rules 属性改变后立即触发一次验证
    size: String, // 用于控制该表单内组件的尺寸
    disabled: Boolean, // 是否禁用该表单内的所有组件
    loading: Boolean, // 是否提交或加载中
    gutter: {
        type: Number,
        default: 10
    },
    span: {
        type: Number,
        default: 24
    }
});

</script>