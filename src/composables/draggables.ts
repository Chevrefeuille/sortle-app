import { ref } from "vue";

export const useDraggable = () => {
  const drag = ref(false);
  const dragOptions = {
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "bg-slate-500",
  };

  return { drag, dragOptions };
};
