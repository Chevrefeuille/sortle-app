import { useStorage } from "@vueuse/core";
import { onMounted } from "vue";
import { getDailyRanking } from "@/services/api";
import { shuffle } from "lodash";
import type { IRanking } from "@/types";

export interface State {
  submitted: boolean;
  score: number | null;
  ranking: IRanking | null;
  correctPositions: number[];
}

export function useState() {
  const state = useStorage("sortle-state", {
    submitted: false,
    score: null,
    ranking: null,
    correctPositions: [],
  } as State);

  onMounted(async () => {
    const dailyRanking = (await getDailyRanking()) as IRanking;
    if (
      !state.value.ranking ||
      state.value.ranking["_id"] != dailyRanking["_id"]
    ) {
      // if daily not yet played
      state.value.ranking = dailyRanking;
      state.value.ranking.choices = shuffle(dailyRanking["choices"]);
      state.value.submitted = false;
      state.value.score = null;
      state.value.correctPositions = [];
    }
  });

  const updateState = (answer: any) => {
    state.value.correctPositions = answer["correction"];
    state.value.score = answer["score"];
    if (!state.value.ranking) return;
    state.value.ranking.choices = state.value.ranking.choices.map(
      (choice: any) => {
        const choiceData = answer["ranking"].choices.find(
          (r: any) => r.name == choice.name
        );
        choice.value = choiceData.value;
        choice.rank = choiceData.rank;
        return choice;
      }
    );
    state.value.submitted = true;
  };

  return { state, updateState };
}
