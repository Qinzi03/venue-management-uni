<template>
  <view class="content">
    <uv-form
      labelPosition="left"
      :model="form"
      :rules="rules"
      ref="formEl"
      labelWidth="80"
    >
      <uv-form-item label="场馆名称" prop="name" borderBottom>
        <uv-input v-model="form.name" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item
        label="场馆类型"
        prop="type"
        borderBottom
        @click="onTypeSelect"
      >
        <uv-input
          v-model="form.type"
          disabled
          disabledColor="#ffffff"
          placeholder="请选择场馆类型"
          border="none"
        >
        </uv-input>
        <template v-slot:right>
          <uv-icon name="arrow-right"></uv-icon>
        </template>
      </uv-form-item>
      <uv-form-item label="桌子数量" prop="tableNum" borderBottom>
        <uv-input v-model="form.tableNum" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="场馆地址" prop="address" borderBottom>
        <uv-input v-model="form.address" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="场馆电话" prop="phone" borderBottom>
        <uv-input v-model="form.phone" border="none"> </uv-input>
      </uv-form-item>
      <uv-button
        type="primary"
        text="提交"
        customStyle="margin-top: 10px"
        @click="onSubmit"
      ></uv-button>
      <uv-action-sheet
        ref="typeSelect"
        :actions="actions"
        title="请选择场馆类型"
        @select="onTypeSelect"
      >
      </uv-action-sheet>
    </uv-form>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";

// 加入场馆
const form = reactive({
  name: "",
  type: "",
  typeId: "",
  tableNum: "",
  address: "",
  phone: "",
});
const actions = ref([
  {
    name: "麻将馆",
    id: 1,
  },
]);
const onTypeSelect = ({ id, name }) => {
  form.type = name;
  form.typeId = id;
};
const rules = reactive({
  name: {
    type: "string",
    required: true,
    message: "请填写场馆名称",
    trigger: ["blur", "change"],
  },
  type: {
    type: "string",
    required: true,
    message: "请选择场馆类型",
    trigger: ["blur", "change"],
  },
  tableNum: {
    type: "string",
    required: true,
    message: "请填写桌子数量",
    trigger: ["blur", "change"],
  },
  address: {
    type: "string",
    required: true,
    message: "请填写场馆地址",
    trigger: ["blur", "change"],
  },
});

const formEl = ref();

const onSubmit = async () => {
  const res = await formEl.value.validate();
  console.log(res);
  uni.showToast({
    icon: "success",
    title: "提交成功",
  });
};
</script>
<style lang="scss" scoped>
.content {
  padding: 10px;
}
</style>
