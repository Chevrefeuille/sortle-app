import { ref } from "vue";

export const useDraggable = () => {
  const drag = ref(false);
  const dragOptions = {
    animation: 500,
    ghostClass: "bg-slate-500",
  };

  return { drag, dragOptions };
};
