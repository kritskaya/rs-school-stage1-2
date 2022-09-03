export class AppService {

  private _garagePage: number;
  private _winnersPage: number;
  private _sort: string;
  private _order: string;
  private animationFrameId: { [index: number]: number } ;

  constructor() {
    this.garagePage = 1;
    this.winnersPage = 1;
    this.sort = '';
    this.order = '';
    this.animationFrameId = {};
  }

  public get garagePage(): number {
    return this._garagePage;
  }

  public set garagePage(page: number) {
    this._garagePage = page;
  }

  public get winnersPage(): number {
    return this._winnersPage;
  }

  public set winnersPage(page: number) {
    this._winnersPage = page;
  }

  public get sort(): string {
    return this._sort;
  }

  public set sort(sort: string) {
    this._sort = sort;
  }

  public get order(): string {
    return this._order;
  }

  public set order(order: string) {
    this._order = order;
  }

  public getAnimationFrameId(carId: number): number {
    return this.animationFrameId[carId];
  }

  public setAnimationFrameId(carId: number, frameId: number) {
    this.animationFrameId[carId] = frameId;
  }
}