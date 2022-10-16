export interface IChoice {
  name: string;
  value: string;
  rank?: number;
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
