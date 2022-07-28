export interface ICar {
  id: number;
  name: string;
  color: string;
}

export interface IEngine {
  id: number,
  status: 'started' | 'stopped' | 'drive';
}

export class Car {
  private id: number;
  private name: string;
  private color: string;
  private engine: Omit<IEngine, 'id'>;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    this.color = color;
  }

  public getEngine(): Omit<IEngine, 'id'> {
    return this.engine;
  }

  public setEngine(engine: Omit<IEngine, 'id'>): void {
    this.engine = engine;
  }
}