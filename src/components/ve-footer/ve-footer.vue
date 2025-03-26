<template>
  <view>
    <uv-tabbar :value="tabName" @change="changeTabbar" activeColor="#9fdfca">
      <uv-tabbar-item text="首页" icon="home" name="index"></uv-tabbar-item>
      <uv-tabbar-item text="场馆" icon="grid" name="venue"></uv-tabbar-item>
      <uv-tabbar-item text="我的" icon="account" name="person"></uv-tabbar-item>
    </uv-tabbar>
  </view>
</template>

<script setup>
import { ref, toRefs } from "vue";
const props = defineProps({
  tabName: {
    type: String,
    default: "index",
  },
});
const { tabName } = toRefs(props);
const changeTabbar = (name) => {
  uni.navigateTo({
    url: `/pages/${name}/index`,
  });
};
</script>
