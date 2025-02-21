<template>
  <view>
    <uv-sticky bgColor="#fff">
      <uv-tabs
        :list="tabList"
        :current="current"
        @click="onClick"
        :scrollable="false"
      ></uv-tabs>
    </uv-sticky>

    <uv-list v-if="!current" class="marginT20" :itemStyle="{ height: '50px' }">
      <uv-list-item v-for="item in createList" :key="item.id">
        <uv-cell
          :title="item.name"
          :label="`${item.onLineNum}人`"
          @click="onToPage"
        >
          <template #value>
            <view class="flex" @click.stop="onUpdatePartner(item)">
              <uv-icon name="plus"></uv-icon>合伙人管理
            </view>
          </template>
        </uv-cell>
      </uv-list-item>
    </uv-list>
    <uv-list v-if="current === 1" class="marginT20">
      <uv-list-item v-for="item in joinedList" :key="item.id">
        <uv-cell
          :title="item.name"
          :border="false"
          :customStyle="{
            padding: '6px 6px',
            'border-bottom': '1px solid #d6d7d9',
          }"
        >
        </uv-cell>
      </uv-list-item>
    </uv-list>

    <view class="add" @click="onAdd">
      <uv-icon name="plus" size="30" color="#ffffff"></uv-icon>
    </view>
    <ve-footer tabName="venue"> </ve-footer>

    <!-- 选择新增类型 -->
    <uv-action-sheet
      ref="actionSheet"
      :actions="actionList"
      title="选择类型"
      @select="onSelect"
    >
    </uv-action-sheet>

    <!-- 加入场馆 -->
    <uv-modal ref="modal" title="加入场馆">
      <uv-form
        labelPosition="left"
        :model="joinedForm"
        :rules="rules"
        ref="joinFormEl"
        labelWidth="100"
      >
        <uv-form-item label="场馆名称" prop="name" borderBottom>
          <uv-input v-model="joinedForm.name" border="none"> </uv-input>
        </uv-form-item>
      </uv-form>
      <template #confirmButton>
        <view class="flex marginB20">
          <view class="marginR20">
            <uv-button
              text="取消"
              size="small"
              @click="onCancelJoin"
            ></uv-button
          ></view>
          <view class="marginR20">
            <uv-button
              text="确定"
              type="primary"
              size="small"
              @click="onSubmit"
            ></uv-button>
          </view>
        </view>
      </template>
    </uv-modal>

    <!-- 合伙人管理 -->
    <uv-modal ref="partnerModal" title="合伙人管理">
      <uv-form
        labelPosition="left"
        :model="partnerForm"
        :rules="rules"
        ref="partnerFormEl"
      >
        <uv-form-item label="微信名" prop="name" borderBottom labelWidth="60">
          <uv-input v-model="partnerForm.name" border="none"> </uv-input>
        </uv-form-item>
      </uv-form>
      <template #confirmButton>
        <view class="flex marginB20">
          <view class="marginR20">
            <uv-button
              text="取消"
              size="small"
              @click="onCancelPartner"
            ></uv-button
          ></view>
          <view class="marginR20">
            <uv-button
              type="primary"
              text="添加合伙人"
              size="small"
              @click="onAddPartner"
            ></uv-button
          ></view>
          <view class="marginR20">
            <uv-button
              type="error"
              text="删除合伙人"
              size="small"
              @click="onDelPartner"
            ></uv-button>
          </view>
        </view>
      </template>
    </uv-modal>
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";

const tabList = ref([
  {
    name: "我创建的",
  },
  {
    name: "我加入的",
  },
]);

const current = ref(0);
const onClick = ({ index }) => {
  console.log("----onClick", index);
  current.value = index;
};

const createList = ref([
  {
    id: 1,
    onLineNum: 1,
    name: "春来花几枝",
  },
  {
    id: 2,
    onLineNum: 12,
    name: "天下谁人不识君",
  },
]);
const joinedList = ref([
  {
    id: 1,
    name: "上岸",
  },
  {
    id: 2,
    name: "nice",
  },
]);

const actionList = ref([
  {
    name: "创建场馆",
    id: 1,
  },
  {
    name: "加入场馆",
    id: 2,
  },
]);
// 选择新增类型
const actionSheet = ref();
const modal = ref();
const onAdd = () => {
  actionSheet.value.open();
};
const onSelect = ({ id }) => {
  if (id === 2) {
    modal.value.open();
    return;
  }
  uni.navigateTo({
    url: `/pages/createVenue/index`,
  });
};

// 加入场馆
const joinedForm = reactive({
  name: "",
});
const rules = reactive({
  name: {
    type: "string",
    required: true,
    message: "请填写微信名",
    trigger: ["blur", "change"],
  },
});
const onCancelJoin = () => {
  modal.value.close();
};
const joinFormEl = ref();

const onSubmit = async () => {
  const res = await joinFormEl.value.validate();
  console.log(res);
  uni.showToast({
    icon: "success",
    title: "提交成功",
  });
  setTimeout(() => {
    onCancelJoin();
  }, 2000);
};

const partnerModal = ref();
const partnerFormEl = ref();
const partnerForm = reactive({
  name: "",
});
const currentItem = ref({});
// 合伙人管理
const onUpdatePartner = (item) => {
  partnerModal.value.open();
  currentItem.value = item;
};
// 跳转详情
const onToPage = (item) => {
  uni.navigateTo({
    url: "/pages/venueDetail/index",
  });
};
const onCancelPartner = () => {
  partnerModal.value.close();
};
const onAddPartner = async () => {
  const res = await partnerFormEl.value.validate();
  uni.showToast({
    icon: "success",
    title: "添加成功",
  });
};
const onDelPartner = async () => {
  const res = await partnerFormEl.value.validate();
  uni.showToast({
    icon: "success",
    title: "删除成功",
  });
};
</script>
<style lang="scss" scoped>
.add {
  position: fixed;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #1989fa;
  bottom: 120px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.marginT20 {
  margin-top: 20px;
}
</style>
