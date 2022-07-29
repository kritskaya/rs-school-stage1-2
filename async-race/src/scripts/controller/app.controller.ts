import { ApiService } from "../service/api.service";
import { GarageView } from "../views/garage/garage.view";
import { WinnersView } from "../views/winners/winners.view";

export class AppController {

  private api: ApiService;
  private garageView: GarageView;
  private winnerView: WinnersView;

  constructor() {
    this.api = new ApiService();
    this.garageView = new GarageView();
    this.winnerView = new WinnersView();
  }

  public async renderApp() {
    const cars = await this.api.getCars();
    this.garageView.renderMain(cars);

    const winners = await this.api.getWinners();
    this.winnerView.renderWinnerPage(winners);
  }

  public clickEventHadler(): void {
    document.body.addEventListener('click', async (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('nav__btn_garage')) {
        this.garageView.showGaragePage();
      }

      if (target.classList.contains('nav__btn_winners')) {
        const winners = await this.api.getWinners();
        this.winnerView.showWinnersPage(winners);
      }

      if (target.classList.contains('btn_create-car')) {
        this.createCar();
      }

      if (target.classList.contains('car__btn_remove')) {
        const id = target.dataset.id;
        if (id) {
          this.removeCar(+id);
        }
      }
    });
  }

  public async createCar() {
    const name = document.querySelector<HTMLInputElement>('#create-car-name')?.value;
    const color = document.querySelector<HTMLInputElement>('#create-car-color')?.value;

    if (name && color) {
      await this.api.createCar({ name, color });
      const cars = await this.api.getCars();
      
      this.garageView.updateGarageView(cars);
    }
  }

  public async removeCar(id: number) {
    await this.api.deleteCar(id);
    await this.api.deleteWinner(id);
    const cars = await this.api.getCars();
      
    this.garageView.updateGarageView(cars);
  }
  
  
}