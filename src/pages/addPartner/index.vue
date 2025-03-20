<template>
  <view class="search">
    <uv-search
      placeholder="搜索合伙人微信昵称"
      :showAction="false"
      v-model="keyword"
      @change="onInput"
    ></uv-search>
    <view class="list">
      <uv-list>
        <uv-list-item v-for="item in list" :key="item.ID" :title="item.Name">
          <view
            class="listItem"
            @click="onClickItem(item)"
            v-html="item.Name"
          ></view>
        </uv-list-item>
      </uv-list>
    </view>
    <uv-modal
      ref="modal"
      title="添加合伙人"
      :content="`确定将${name}添加为合伙人`"
      @confirm="onConfirm"
    ></uv-modal>
  </view>
</template>

<script setup>
import { getCurrentInstance, ref } from "vue";
import { searchUser, addPartner } from "@/config/api.js";
import { onLoad } from "@dcloudio/uni-app";

const list = ref([]);
const getListData = async (keyword) => {
  const res = await searchUser({ name: keyword });
  list.value = res.data;
};
const keyword = ref("");
const onInput = (keyword) => {
  getListData(keyword);
};

const modal = ref();
const choosedItem = ref("");
const onClickItem = (item) => {
  modal.value.open();
  choosedItem.value = item;
};

const venueId = ref();
const onConfirm = async () => {
  await addPartner({ venue_id: venueId, user_id: choosedItem.id });
  const instance = getCurrentInstance().proxy;
  const eventChannel = instance.getOpenerEventChannel();

  eventChannel.emit("confirm", {
    data: "1",
  });

  uni.navigateBack();
};

onLoad((option) => {
  venueId = option.venueId;
});
</script>

<style scoped>
.search {
  padding: 10px 16px;
}
.list {
  margin-top: 20px;
}
.listItem {
  padding: 10px;
}
</style>
