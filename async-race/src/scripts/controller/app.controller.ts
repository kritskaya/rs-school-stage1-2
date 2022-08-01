import { ICar } from "../model/car.model";
import { ApiService } from "../service/api.service";
import { AppService } from "../service/app.service";
import { GarageView } from "../views/garage/garage.view";
import { WinnersView } from "../views/winners/winners.view";

export class AppController {

  private api: ApiService;
  private service: AppService;
  private garageView: GarageView;
  private winnerView: WinnersView;

  constructor() {
    this.api = new ApiService();
    this.service = new AppService();
    this.garageView = new GarageView();
    this.winnerView = new WinnersView();
  }

  public async renderApp(): Promise<void> {
    const { cars, amount } = await this.api.getCars();
    this.garageView.renderMain(cars, amount);

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

      if (target.classList.contains('btn_next')) {
        const currentPage = this.service.getGaragePage();
        const {cars, amount} = await this.api.getCars(currentPage + 1);
        this.garageView.updateGarageView(cars, currentPage + 1, amount);
        this.service.setGaragePage(currentPage + 1);
      }

      if (target.classList.contains('btn_prev')) {
        const currentPage = this.service.getGaragePage();
        const {cars, amount} = await this.api.getCars(currentPage - 1);
        this.garageView.updateGarageView(cars, currentPage - 1, amount);
        this.service.setGaragePage(currentPage - 1);
      }

      if (target.classList.contains('car__btn_start')) {
        const id = target.dataset.id;
        if (id) {
          await this.startDrivingCar(+id);
        }
      }

      if (target.classList.contains('btn_start-race')) {
        const currentPage = this.service.getGaragePage();
        const {cars} = await this.api.getCars(currentPage - 1);
        await this.startRace(cars);
      }

      if (target.classList.contains('btn_generate')) {
        await this.generateRandomCars();
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

      const currentPage = this.service.getGaragePage();
      const {cars, amount} = await this.api.getCars(currentPage);
      
      this.garageView.updateGarageView(cars, currentPage, amount);
      nameElement.value = '';
      colorElement.value = '#000000';
    }
  }

  public async removeCar(id: number): Promise<void> {
    await this.api.deleteCar(id);
    await this.api.deleteWinner(id);

    const currentPage = this.service.getGaragePage();
    const { cars, amount } = await this.api.getCars(currentPage);
      
    this.garageView.updateGarageView(cars, currentPage, amount);
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
      nameElement.disabled = false;
      colorElement.disabled = false;
      (<HTMLInputElement>btn).disabled = false;
    }
  }

  public async updateCar(id: number): Promise<void> {
    const nameElement = document.querySelector<HTMLInputElement>('#update-car-name');
    const colorElement = document.querySelector<HTMLInputElement>('#update-car-color');
    const btn = colorElement?.nextElementSibling;

    if (nameElement && colorElement && btn) {
      const name = nameElement.value;
      const color = colorElement.value;

      await this.api.updateCar(id, {name, color});

      const currentPage = this.service.getGaragePage();
      const { cars, amount } = await this.api.getCars(currentPage);
        
      this.garageView.updateGarageView(cars, currentPage, amount);
      nameElement.value = '';
      colorElement.value = '#000000';

      nameElement.disabled = true;
      colorElement.disabled = true;
      (<HTMLInputElement>btn).disabled = true;
    }
  }  

  public async startDrivingCar(id: number): Promise<{id: number, time: number}> {
    const { velocity, distance } = await this.api.startEngine(id);
    const time = Math.round(distance / velocity);
    console.log('id', id, 'time', time);

    const carElement = document.getElementById(`car-${id}`)!;
    const flagElement = document.getElementById(`flag-${id}`)!;

    const pxDistance = this.getDistanceBeetween(carElement, flagElement);
    
    const animationId = this.animation(carElement, pxDistance, time);
    this.service.setAnimationFrameId(id, animationId);

    const { success } = await this.api.driveCar(id);
    
    if (!success) {
      const currentId = this.service.getAnimationFrameId(id);
      window.cancelAnimationFrame(currentId);
      throw new Error('Car was broken');
    }

    return {id, time};
  }

  public getDistanceBeetween(car: HTMLElement, flag: HTMLElement) {
		const carLeft = car.getBoundingClientRect().left;
    const flagRight = flag.getBoundingClientRect().right;

    return Math.floor(flagRight - carLeft);
	}

  public animation(car: HTMLElement, distance: number, time: number): number {
    let startTime: number;
    let frameId: number;

    const id = +car.id.split('-')[1];
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      
      const frameTime = timestamp - startTime;
      
      const currentDistance = Math.round(distance / time * frameTime);

      car.style.transform = `translateX(${Math.min(distance, currentDistance)}px)`;

      if (currentDistance < distance) {
        frameId = window.requestAnimationFrame(step);
        this.service.setAnimationFrameId(id, frameId);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return frameId;
  }

  public async startRace(cars: ICar[]): Promise<void> {
    const promises = cars.map((car) => this.startDrivingCar(car.id));

    const { id, time } = await Promise.any(promises);
    if (id && time) {
      this.addWinner(id, time);
    }
  }

  public async addWinner(id: number, time: number): Promise<void> {
    time = Math.floor(time / 100) / 10;
    const winner = await this.api.getWinner(id);
    const car = await this.api.getCar(id);    
    
    if (winner) {
      const wins =  winner.wins + 1;
      await this.api.updateWinner(id, {wins, time, car});
    } else {
      const wins = 1;
      await this.api.createWinner({id, wins, time, car})
    }
  }

  public generateCarName(): string {
    const models = ['BMW', 'Toyota', 'Opel', 'Renault', 'Peugeot', 'Lada', 'Audi', 'Ford', 'Mazda', 'Ferarri'];
    const types = ['X3', 'X5', 'Camri', 'Corola', 'Astra', 'Duster', 'Vesta', 'A6', 'Focus', '3', '6', 'roma'];

    const model = models[Math.floor(Math.random() * models.length)];
    const type = types[Math.floor(Math.random() * types.length)];

    return `${model} ${type}`;
  }

  public generateColor(): string {
    const MAX_COLOR = 16777215;
    const color = Math.floor(Math.random() * MAX_COLOR);
    
    return `#${color.toString(16)}`;
  }

  public async generateRandomCars() {
    const CAR_QUANTITY = 100;

    for (let i = 0; i < CAR_QUANTITY; i += 1) {
      const name = this.generateCarName();
      const color = this.generateColor();

      await this.api.createCar({ name, color });      
    }

    const currentPage = this.service.getGaragePage();
    const {cars, amount} = await this.api.getCars(currentPage);

    this.garageView.updateGarageView(cars, currentPage, amount);
  }
}