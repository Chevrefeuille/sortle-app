import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

interface Statistics {
  lastDayPlayed: string | null;
  numberPlayed: number;
  currentStreak: number;
  maxStreak: number;
  scores: { [key: number]: number };
}

export const useStatisticsStore = defineStore("statistics", () => {
  const statistics = useStorage("sortle-statistics", {
    lastDayPlayed: null,
    numberPlayed: 0,
    currentStreak: 0,
    maxStreak: 0,
    scores: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  } as Statistics);

  return { statistics };
});
