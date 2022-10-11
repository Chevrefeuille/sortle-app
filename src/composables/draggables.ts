import { ref } from "vue";

export const drag = ref(false);
export const dragOptions = {
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "bg-slate-500",
};
