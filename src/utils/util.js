import { ref } from "vue";
export const loginStatus = ref(false);
export const onChangeLoginStatus = (value) => {
  loginStatus.value = value;
};

export const formatDate = (date) => {
  return date
    .toLocaleDateString("zh", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");
};
export const formatShortDate = (date) => {
  const arr = date.split("-");
  return `${arr[1]}-${arr[2]}`;
};
