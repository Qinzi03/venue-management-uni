<template>
  <view>
    <uv-list
      v-if="createList.length"
      class="marginT20"
      :itemStyle="{ height: '50px' }"
    >
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
    <view class="empty" v-else>
      <uv-empty
        mode="list"
        text="您还没有创建的场馆，请点击右下角进行创建"
      ></uv-empty>
    </view>
    <view class="add" @click="onAdd"> 创建场馆 </view>
    <ve-footer tabName="venue"> </ve-footer>

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
import { onMounted, reactive, ref } from "vue";
import { myVenue } from "@/config/api.js";
onMounted(() => {
  getListData();
});

const getListData = async () => {
  const res = await myVenue();
  createList.value = res || [];
};

const createList = ref([]);

// 选择新增类型
const actionSheet = ref();
const modal = ref();
const onAdd = () => {
  uni.navigateTo({
    url: `/pages/createVenue/index`,
  });
};

const rules = reactive({
  name: {
    type: "string",
    required: true,
    message: "请填写微信名",
    trigger: ["blur", "change"],
  },
});

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
  width: 40px;
  height: 40px;
  border-radius: 60px;
  background-color: #1989fa;
  bottom: 120px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 10px;
  text-align: center;
}
.flex {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.marginT20 {
  margin-top: 20px;
}
.empty {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -140px;
  margin-top: -80px;
}
</style>
