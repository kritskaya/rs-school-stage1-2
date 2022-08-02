export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IEngine {
  id: number,
  status: 'started' | 'stopped' | 'drive';
}
