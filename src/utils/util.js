import { ref } from "vue";
export const loginStatus = ref(false);
export const onChangeLoginStatus = (value) => {
  loginStatus.value = value;
};
