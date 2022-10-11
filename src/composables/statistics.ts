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

  return statisticsStore.statistics;
}
