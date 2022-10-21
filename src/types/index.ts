export interface IChoice {
  name: string;
  value: string;
  rank?: number;
}

export interface IRanking {
  _id?: string;
  criterion: string;
  left: string;
  right: string;
  type: string;
  choices: IChoice[];
}

export interface IStatistics {
  lastDayPlayed: string | null;
  numberPlayed: number;
  currentStreak: number;
  maxStreak: number;
  scores: { [key: number]: number };
}

export interface IState {
  submitted: boolean;
  score: number | null;
  kendallScore: number | null;
  ranking: IRanking | null;
  correctPositions: number[] | null;
}

export interface IStateRecord {
  date: string;
  state: IState;
}

export interface IHistory {
  stateRecords: IStateRecord[];
}
