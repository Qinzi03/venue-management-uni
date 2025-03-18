<template>
  <view class="search">
    <uv-search
      placeholder="搜索场馆"
      :showAction="false"
      v-model="keyword"
      @change="onInput"
    ></uv-search>
    <view class="list">
      <uv-list>
        <uv-list-item v-for="item in list" :key="item.ID" :title="item.Name">
          <view
            class="listItem"
            @click="onPage(item)"
            v-html="item.Name"
          ></view>
        </uv-list-item>
      </uv-list>
    </view>
  </view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAllVenue } from "@/config/api.js";

const list = ref([]);
const getListData = async () => {
  const res = await getAllVenue();
  list.value = res.venues;
};
const keyword = ref("");
const onInput = () => {
  changeColor(list.value);
};

const changeColor = (resultsList) => {
  resultsList.map((item, index) => {
    if (keyword.value) {
      // 匹配关键字正则
      let replaceReg = new RegExp(keyword.value, "g");
      // 高亮替换v-html值
      let replaceString =
        "<font style='color:#1042df'>" + keyword.value + "</font>";
      if (resultsList[index].Name) {
        resultsList[index].Name = item.Name.replace(replaceReg, replaceString);
      }
    }
  });
  list.value = resultsList;
};
// 去打卡
const onPage = (item) => {
  uni.navigateTo({
    url: `/pages/venueDetail/index?id=${item.ID}`,
  });
};

onMounted(() => {
  getListData();
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
