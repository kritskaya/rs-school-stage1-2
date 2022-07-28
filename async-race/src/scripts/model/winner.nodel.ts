export class Winner {
    
  constructor(
    private id: number,
    private wins: number,
    private time: number,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getWins(): number {
    return this.wins;
  }

  public addWins(): void {
    this.wins += 1;
  }

  public getTime(): number {
    return this.time;
  }

  public setTime(time: number): void {
    this.time = time;
  }
}