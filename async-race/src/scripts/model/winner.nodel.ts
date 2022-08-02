import { ICar } from './car.model';

export interface IWinner {
  id: number;
  wins: number;
  time: number;
  car: ICar;
}

export enum SortType {
  WINS = 'wins',
  TIME = 'time',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
