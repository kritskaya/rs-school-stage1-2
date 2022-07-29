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

  public async renderApp(): Promise<void> {
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

      if (target.classList.contains('car__btn_select')) {
        const id = target.dataset.id;
        if (id) {
          this.selectCar(+id);
        }
      }

      if (target.classList.contains('btn_update-car')) {
        const id = target.dataset.id;
        if (id) {
          this.updateCar(+id);
        }
      }
    });
  }

  public async createCar(): Promise<void> {
    const nameElement = document.querySelector<HTMLInputElement>('#create-car-name');
    const colorElement = document.querySelector<HTMLInputElement>('#create-car-color');

    if (nameElement && colorElement) {
      const name = nameElement.value;
      const color = colorElement.value;

      await this.api.createCar({ name, color });
      const cars = await this.api.getCars();
      
      this.garageView.updateGarageView(cars);
      nameElement.value = '';
      colorElement.value = '#000000';
    }
  }

  public async removeCar(id: number): Promise<void> {
    await this.api.deleteCar(id);
    await this.api.deleteWinner(id);
    const cars = await this.api.getCars();
      
    this.garageView.updateGarageView(cars);
  }

  public async selectCar(id: number): Promise<void> {
    const nameElement = document.querySelector<HTMLInputElement>('#update-car-name');
    const colorElement = document.querySelector<HTMLInputElement>('#update-car-color');
    const btn = colorElement?.nextElementSibling;

    if (nameElement && colorElement && btn) {
      const car = await this.api.getCar(id);
      nameElement.value = car.name;
      colorElement.value = car.color;
      (<HTMLElement>btn).dataset.id = `${car.id}`;
    }
  }

  public async updateCar(id: number): Promise<void> {
    const nameElement = document.querySelector<HTMLInputElement>('#update-car-name');
    const colorElement = document.querySelector<HTMLInputElement>('#update-car-color');

    if (nameElement && colorElement) {
      const name = nameElement.value;
      const color = colorElement.value;

      await this.api.updateCar(id, {name, color});
      const cars = await this.api.getCars();
        
      this.garageView.updateGarageView(cars);
      nameElement.value = '';
      colorElement.value = '#000000';
    }
  }  
}