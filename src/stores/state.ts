import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { IState, IRanking, IChoice } from "@/types";
import { getDailyRanking } from "@/services/api";
import { shuffle } from "lodash";

export const useStateStore = defineStore("state", () => {
  const loading = ref(false);
  const error = ref("");

  const state = useStorage("sortle-state", {
    submitted: false,
    score: null,
    kendallScore: null,
    ranking: null,
    correctPositions: null,
  } as IState);

  const fetchDaily = async () => {
    loading.value = true;
    try {
      const dailyRanking = (await getDailyRanking()) as IRanking;
      if (
        !state.value.ranking || // never played or local storage has been cleared
        state.value.ranking["_id"] != dailyRanking["_id"] // daily not played
      ) {
        state.value.ranking = dailyRanking;
        state.value.ranking.choices = shuffle(dailyRanking["choices"]);
        state.value.submitted = false;
        state.value.score = null;
        state.value.correctPositions = null;
      }
    } catch (err: any) {
      error.value = err;
    } finally {
      loading.value = true;
    }
  };

  const updateState = (answer: any) => {
    state.value.correctPositions = answer["correction"];
    state.value.score = answer["score"];
    state.value.kendallScore = answer["kendallScore"];
    if (!state.value.ranking) return;
    state.value.ranking.choices = state.value.ranking.choices.map(
      (choice: any) => {
        const choiceIndex = answer["ranking"].choices.findIndex(
          (r: any) => r.name == choice.name
        );
        choice.value = answer["ranking"].choices[choiceIndex].value;
        choice.rank = choiceIndex + 1;
        return choice;
      }
    );
    state.value.submitted = true;
  };

  const reorder = (choices: IChoice[]) => {
    if (state.value.ranking) {
      state.value.ranking.choices = choices;
    }
  };

  return { state, loading, error, fetchDaily, updateState, reorder };
});
