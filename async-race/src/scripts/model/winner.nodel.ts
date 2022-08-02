import { ICar } from './car.model';

export interface IWinner {
  id: number;
  wins: number;
  time: number;
  car: ICar;
}
