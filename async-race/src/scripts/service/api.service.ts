import { ICar } from '../model/car.model';
import { IWinner } from '../model/winner.nodel';

export class ApiService{
  private garage = `${this.base}/garage`;
  private engine = `${this.base}/engine`;
  private winner = `${this.base}/winners`;

  constructor(
    private base: string
  ) {}

  public async getCars(page = 1, limit = 7): Promise<{ cars: ICar[], amount: number }> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    const amount = response.headers.get('X-Total-Count') || 0;
    return {
      cars,
      amount: +amount,
    };
  }

  public async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.garage}/${id}`);
    const car: ICar = await response.json();
    return car;
  }

  public async createCar(item: Omit<ICar, 'id'>): Promise<{ name: string, color: string, id: number }> {
    const params = {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(this.garage, params);
    const newCar: { name: string, color: string, id: number } = await response.json();
    return newCar;
  }

  public async deleteCar(id: number): Promise<{}> {
    const params = {
      method: 'DELETE',
    };
    const response = await fetch(`${this.garage}/${id}`, params);
    return await response.json();
  }

  public async updateCar(id: number, item: Omit<ICar, 'id'>): Promise<{ name: string, color: string, id: number }> {
    const params = {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(`${this.garage}/${id}`, params);
    const car: { name: string, color: string, id: number } = await response.json();
    return car;
  }

  public async startEngine(id: number): Promise<{ velocity: number, distance: number }> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=started`, params);
    const carData: { velocity: number, distance: number } = await response.json();
    return carData;
  }

  public async stopEngine(id: number): Promise<{ velocity: number, distance: number }> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=stopped`, params);
    const carData: { velocity: number, distance: number } = await response.json();
    return carData;
  }

  public async driveCar(id: number): Promise<{ success: boolean }> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=drive`, params);
    
    if (response.status !== 200) return { success: false };
    
    const drivngStatus: { success: boolean } = await response.json();
    return drivngStatus;
  }

  public async getWinners(page = 1, limit = 10, sort?: string, order?: string): Promise<{ winners: IWinner[], amount: number }> {
    const response = await fetch(`${this.winner}?_page=${page}&_limit=${limit}${(sort && order) ? `&_sort=${sort}&_order=${order}` : ''}`);
    const winnersData: IWinner[] = await response.json();
    const winners = await Promise.all(winnersData.map(async (item: IWinner) => Object.assign(item, { car: await this.getCar(item.id) })));
    
    const amount = response.headers.get('X-Total-Count') || 0;
    return {
      winners,
      amount: +amount,
    };
  }

  public async getWinner(id: number): Promise<IWinner | null> {

    const response = await fetch(`${this.winner}/${id}`);
    const json = await response.json();
    
    if (response.status === 200) {
      const winner: IWinner = await Object.assign(json, { car: await this.getCar(id) });
      return winner;
    }

    return null;
  }

  public async createWinner(item: IWinner): Promise<Omit<IWinner, 'car'>> {
    const params = {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(`${this.winner}`, params);
    const winner: Omit<IWinner, 'car'> = await response.json();

    return winner;
  }

  public async deleteWinner(id: number): Promise<{}> {
    const params = {
      method: 'DELETE',
    };

    const response = await fetch(`${this.winner}/${id}`, params);
    return await response.json();
  }

  public async updateWinner(id: number, item: Omit<IWinner, 'id'>): Promise<Omit<IWinner, 'car'>> {
    const params = {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${this.winner}/${id}`, params);
    const winner: Omit<IWinner, 'car'> = await response.json();

    return winner;
  }
}