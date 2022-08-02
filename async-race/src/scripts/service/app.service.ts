export class AppService {

  private garagePage: number;
  private winnersPage: number;
  private sort: string;
  private order: string;
  animationFrameId: { [index: number]: number };

  constructor() {
    this.garagePage = 1;
    this.winnersPage = 1;
    this.sort = '';
    this.order = '';
    this.animationFrameId = {};
  }

  public getGaragePage(): number {
    return this.garagePage;
  }

  public setGaragePage(page: number) {
    this.garagePage = page;
  }

  public getWinnersPage(): number {
    return this.winnersPage;
  }

  public setWinnersPage(page: number) {
    this.winnersPage = page;
  }

  public getSort(): string {
    return this.sort;
  }

  public setSort(sort: string): void {
    this.sort = sort;
  }

  public getOrder(): string {
    return this.order;
  }

  public setOrder(order: string): void {
    this.order = order;
  }

  public getAnimationFrameId(carId: number): number {
    return this.animationFrameId[carId];
  }

  public setAnimationFrameId(carId: number, frameId: number) {
    this.animationFrameId[carId] = frameId;
  }
}