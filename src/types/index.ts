export interface IChoice {
  name: string;
  rank: number;
  value: string;
}

export interface IRanking {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  criterion: string;
  left: string;
  right: string;
  type: string;
  choices: IChoice[];
  reviewed?: boolean;
}
