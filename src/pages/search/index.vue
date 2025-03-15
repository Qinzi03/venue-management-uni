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
        <uv-list-item v-for="item in list" :key="item.id" :title="item.name">
          <view
            class="listItem"
            @click="onPage(item)"
            v-html="item.name"
          ></view>
        </uv-list-item>
      </uv-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const list = ref([
  {
    name: "和高科技打算给那尽快更换",
    id: 1,
  },
  {
    name: "回到房间",
    id: 2,
  },
  {
    name: "就看看",
    id: 3,
  },
]);
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
      if (resultsList[index].name) {
        resultsList[index].name = item.name.replace(replaceReg, replaceString);
      }
    }
  });
  list.value = resultsList;
};
// 去打卡
const onPage = (item) => {
  uni.navigateTo({
    url: `/pages/venueDetail/index?${item.id}`,
  });
};
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
