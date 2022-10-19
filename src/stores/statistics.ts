import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IStatistics } from "@/types";

const isYesterday = (date: string | null) => {
  if (date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (yesterday.toDateString() === date) {
      return true;
    }
  }
  return false;
};

export const useStatisticsStore = defineStore("statistics", () => {
  const statistics = useStorage("sortle-statistics", {
    lastDayPlayed: null,
    numberPlayed: 0,
    currentStreak: 0,
    maxStreak: 0,
    scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  } as IStatistics);

  const updateStatistics = (score: number) => {
    const now = new Date();
    statistics.value.lastDayPlayed = now.toDateString();
    statistics.value.numberPlayed += 1;
    statistics.value.currentStreak += 1;
    if (statistics.value.currentStreak > statistics.value.maxStreak) {
      statistics.value.maxStreak += 1;
    }
    statistics.value.scores[score] += 1;
  };

  return { statistics, updateStatistics };
});
