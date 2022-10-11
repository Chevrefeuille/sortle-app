import { ref } from "vue";
import { defineStore } from "pinia";

export const useModalsStore = defineStore("modals", () => {
  const statisticsOpened = ref(false);
  function toggleStatistics() {
    statisticsOpened.value = !statisticsOpened.value;
  }

  const howToPlayOpened = ref(false);
  function toggleHowToPlay() {
    howToPlayOpened.value = !howToPlayOpened.value;
  }

  return {
    statisticsOpened,
    toggleStatistics,
    howToPlayOpened,
    toggleHowToPlay,
  };
});
