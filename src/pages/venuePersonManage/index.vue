<template>
  <view>
    <uv-drop-down
      ref="dropDown"
      sign="dropDown_1"
      text-active-color="#3c9cff"
      :defaultValue="defaultValue"
      :custom-style="{ padding: '0 30rpx' }"
      @click="selectMenu"
    >
      <uv-drop-down-item
        name="time"
        type="2"
        :label="timeDecs"
        :value="timeDecs"
      >
      </uv-drop-down-item>
    </uv-drop-down>
    <uv-drop-down-popup
      sign="dropDown_1"
      :click-overlay-on-close="true"
      :currentDropItem="currentDropItem"
      @clickItem="clickItem"
      @popupChange="change"
    ></uv-drop-down-popup>

    <uv-calendars ref="calendars" mode="range" @confirm="confirm" />
  </view>
</template>
<script setup>
import { reactive, ref } from "vue";
const defaultValue = ref([]);
const time = reactive({
  label: "时间筛选",
  value: 0,
  activeIndex: 0,
});
const calendars = ref();
const selectMenu = () => {
  calendars.value.open();
};
const confirm = (value) => {
  console.log(value, "confirm");
};
</script>
