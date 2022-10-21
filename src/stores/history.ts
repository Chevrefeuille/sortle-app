import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IHistory, IState, IStateRecord, IChoice } from "@/types";
import { fetchRankingByDate } from "@/services/api";
import { computed, ref, watch } from "vue";
import { startOfDay, isSameDay } from "date-fns";

export const useHistoryStore = defineStore("history", () => {
  const history = useStorage("sortle-history", {
    stateRecords: [],
  } as IHistory);

  const date = ref<Date>(startOfDay(new Date()));
  const error = ref("");
  const currentState = ref<IState>({
    submitted: false,
    score: null,
    kendallScore: null,
    ranking: null,
    correctPositions: null,
  });

  const isDaily = computed(() => {
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    return isSameDay(utcNow, date.value);
  });

  const setDate = (newDate: Date) => {
    date.value = startOfDay(newDate);
  };

  const getRankingFromDate = async (recordDate: Date) => {
    try {
      // search if the ranking was played
      const startDay = startOfDay(recordDate);
      const stateRecord = history.value.stateRecords.find(
        (stateRecord: IStateRecord) =>
          isSameDay(new Date(stateRecord.date), startDay)
      );
      if (!stateRecord) {
        const ranking = await fetchRankingByDate(startDay);
        currentState.value = {
          ranking: ranking,
          submitted: false,
          score: null,
          kendallScore: null,
          correctPositions: null,
        };
      } else {
        currentState.value = stateRecord.state;
      }
    } catch (err: any) {
      error.value = err;
    }
  };

  const reorder = (choices: IChoice[]) => {
    if (currentState.value && currentState.value.ranking) {
      currentState.value.ranking.choices = choices;
    }
  };

  const updateState = (answer: any) => {
    currentState.value.correctPositions = answer["correction"];
    currentState.value.score = answer["score"];
    currentState.value.kendallScore = answer["kendallScore"];
    if (!currentState.value.ranking) return;
    currentState.value.ranking.choices = currentState.value.ranking.choices.map(
      (choice: any) => {
        const correctChoice = answer["ranking"].choices.find(
          (r: any) => r.name == choice.name
        );
        choice.value = correctChoice.value;
        choice.rank = correctChoice.rank;
        return choice;
      }
    );
    currentState.value.submitted = true;
    const now = new Date();
    const utcNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
    const dateString = utcNow.toISOString().split("T")[0];
    history.value.stateRecords.push({
      date: dateString,
      state: currentState.value,
    });
  };

  watch(date, async () => {
    getRankingFromDate(date.value);
  });

  return {
    history,
    date,
    getRankingFromDate,
    currentState,
    error,
    reorder,
    isDaily,
    setDate,
    updateState,
  };
});
