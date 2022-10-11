import { useStorage } from "@vueuse/core";

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

export const state = useStorage("sortle-state", {
  rankingId: null,
  submitted: false,
  score: null,
  ranking: [],
  rankingData: null,
  correctPositions: [],
} as State);
