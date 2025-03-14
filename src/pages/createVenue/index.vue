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
        @click="onTypeClick"
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
      <uv-form-item label="桌子数量" prop="table_count" borderBottom>
        <uv-input v-model="form.table_count" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="场馆地址" prop="location " borderBottom>
        <uv-input v-model="form.location" border="none"> </uv-input>
      </uv-form-item>
      <uv-form-item label="场馆电话" prop="contact " borderBottom>
        <uv-input v-model="form.contact" border="none"> </uv-input>
      </uv-form-item>

      <uv-action-sheet
        ref="typeSelect"
        :actions="actions"
        title="请选择场馆类型"
        @select="onTypeSelect"
      >
      </uv-action-sheet>
    </uv-form>
    <view class="formFooter">
      <view class="footerBtn">
        <uv-button type="primary" text="提交" @click="onSubmit"></uv-button>
      </view>
    </view>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";
import { saveVenue } from "@/config/api.js";
// 加入场馆
const form = reactive({
  name: "",
  type: "",
  typeId: "",
  table_count: "",
  location: "",
  contact: "",
});
const actions = ref([
  {
    name: "麻将馆",
    id: 1,
  },
]);

const typeSelect = ref();
const onTypeClick = () => {
  typeSelect.value.open();
};

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
  table_count: {
    type: "string",
    required: true,
    message: "请填写桌子数量",
    trigger: ["blur", "change"],
  },
  location: {
    type: "string",
    required: true,
    message: "请填写场馆地址",
    trigger: ["blur", "change"],
  },
});

const formEl = ref();

const onSubmit = async () => {
  const res = await formEl.value.validate();
  console.log(res, form);
  await saveVenue(form);
  uni.showToast({
    icon: "success",
    title: "提交成功",
  });
};
</script>
<style lang="scss" scoped>
::v-deep(.content) {
  padding: 10px 16px;
  .uv-form-item__body {
    padding: 16px 0 !important;
  }
}
</style>
