import { useStatisticsStore } from "@/stores/statistics";

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

export function useStatistics() {
  const statisticsStore = useStatisticsStore();

  if (isYesterday(statisticsStore.statistics.lastDayPlayed)) {
    statisticsStore.statistics.currentStreak = 0;
  }

  const updateStatistics = (score: number) => {
    const now = new Date();
    statisticsStore.statistics.lastDayPlayed = now.toDateString();
    statisticsStore.statistics.numberPlayed += 1;
    statisticsStore.statistics.currentStreak += 1;
    if (
      statisticsStore.statistics.currentStreak >
      statisticsStore.statistics.maxStreak
    ) {
      statisticsStore.statistics.maxStreak += 1;
    }
    statisticsStore.statistics.scores[score] += 1;
  };

  return { updateStatistics };
}
