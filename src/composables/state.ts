import { useStorage } from "@vueuse/core";
import { onMounted } from "vue";
import { getDailyRanking } from "@/services/api";
import { shuffle } from "lodash";

export interface Choice {
  name: string;
  index: number;
  value?: string;
  rank?: number;
}
export interface RankingData {
  criterion: string;
  type: string;
  left: string;
  right: string;
}

export interface State {
  rankingId: string | null;
  submitted: boolean;
  score: number | null;
  ranking: Choice[];
  rankingData: RankingData | null;
  correctPositions: number[];
}

export function useState() {
  const state = useStorage("sortle-state", {
    rankingId: null,
    submitted: false,
    score: null,
    ranking: [],
    rankingData: null,
    correctPositions: [],
  } as State);

  onMounted(async () => {
    const dailyRanking = await getDailyRanking();
    if (state.value.rankingId != dailyRanking["_id"]) {
      // if daily not yet played
      state.value.ranking = shuffle(dailyRanking["choices"]);
      state.value.rankingData = {
        type: dailyRanking["type"],
        criterion: dailyRanking["criterion"],
        left: dailyRanking["left"],
        right: dailyRanking["right"],
      };
      state.value.rankingId = dailyRanking["_id"];
      state.value.submitted = false;
      state.value.score = null;
      state.value.correctPositions = [];
    }
  });

  const updateState = (answer: any) => {
    state.value.correctPositions = answer["correction"];
    state.value.score = answer["score"];
    state.value.ranking = state.value.ranking.map((choice: any) => {
      const choiceData = answer["ranking"].choices.find(
        (r: any) => r.name == choice.name
      );
      choice.value = choiceData.value;
      choice.rank = choiceData.rank;
      return choice;
    });
    state.value.submitted = true;
  };

  return { state, updateState };
}
