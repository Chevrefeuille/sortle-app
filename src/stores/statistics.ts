import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IStatistics } from "@/types";
import { computed } from "vue";
import { isYesterday, isToday } from "date-fns";

export const useStatisticsStore = defineStore("statistics", () => {
  const statistics = useStorage("sortle-statistics", {
    lastDayPlayed: null,
    numberPlayed: 0,
    currentStreak: 0,
    maxStreak: 0,
    scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  } as IStatistics);

  // reset strike
  if (
    statistics.value.lastDayPlayed &&
    !(
      isYesterday(new Date(statistics.value.lastDayPlayed)) ||
      isToday(new Date(statistics.value.lastDayPlayed))
    )
  ) {
    statistics.value.currentStreak = 0;
  }

  const updateStatistics = (score: number) => {
    const now = new Date();
    const dateString = now.toISOString().split("T")[0];
    statistics.value.lastDayPlayed = dateString;
    statistics.value.numberPlayed += 1;
    statistics.value.currentStreak += 1;
    if (statistics.value.currentStreak > statistics.value.maxStreak) {
      statistics.value.maxStreak += 1;
    }
    statistics.value.scores[score] += 1;
  };

  const getBarValues = computed(() => {
    const scores = [0, 1, 2, 3, 4, 5];
    return {
      labels: scores,
      datasets: [{ data: scores.map((s) => statistics.value.scores[s]) }],
    };
  });

  return { statistics, updateStatistics, getBarValues };
});
