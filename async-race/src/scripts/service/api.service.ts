import { ICar } from '../model/car.model';
import { IWinner } from '../model/winner.nodel';

export class ApiService {
  private base = 'http://127.0.0.1:3000';
  private garage = `${this.base}/garage`;
  private engine = `${this.base}/engine`;
  private winner = `${this.base}/winners`;

  public async getCars(page = 1, limit = 7): Promise<{ cars: ICar[], amount: number}> {
    const response = await fetch(`${this.garage}?_page=${page}&_limit=${limit}`);
    const cars = await response.json();
    const amount = response.headers.get('X-Total-Count') || 0;
    return {
      cars,
      amount: +amount
    };
  }

  public async getCar(id: number): Promise<ICar> {
    const response = await fetch(`${this.garage}/${id}`);
    const json = await response.json();
    return json;
  }

  public async createCar(item: Omit<ICar, 'id'>): Promise<JSON> {
    const params = {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(this.garage, params);
    const json = await response.json();
    return json;
  }

  public async deleteCar(id: number): Promise<JSON> {
    const params = {
      method: 'DELETE',
    };
    const response = await fetch(`${this.garage}/${id}`, params);
    const json = await response.json();
    return json;
  }

  public async updateCar(id: number, item: Omit<ICar, 'id'>): Promise<JSON> {
    const params = {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(`${this.garage}/${id}`, params);
    const json = await response.json();
    return json;
  }

  public async startEngine(id: number): Promise<JSON> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=started`, params);
    const json = await response.json();
    return json;
  }

  public async stopEngine(id: number): Promise<JSON> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=stopped`, params);
    const json = await response.json();
    return json;
  }

  public async driveCar(id: number): Promise<JSON> {
    const params = {
      method: 'PATCH',
    };

    const response = await fetch(`${this.engine}?id=${id}&status=drive`, params);
    const json = await response.json();
    return json;
  }

  public async getWinners(page = 1, limit = 10, sort?: string, order?: string): Promise<IWinner[]> {
    const response = await fetch(`${this.winner}?_page=${page}&_limit=${limit}${(sort && order) ? `&_sort=${sort}&_order=${order}` : ''}`);
    const data = await response.json();
    const json = await Promise.all(data.map(async (item: IWinner) => Object.assign(item, { car: await this.getCar(item.id) })));
    
    return json;
  }

  public async getWinner(id: number): Promise<IWinner> {

    const response = await fetch(`${this.winner}/${id}`);
    const data = await response.json();
    const json = await Object.assign(data, { car: await this.getCar(id) });

    return json;
  }

  public async createWinner(item: IWinner): Promise<JSON> {
    const params = {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-type': 'application/json',
      },
    };

    const response = await fetch(`${this.winner}`, params);
    const json = await response.json();

    return json;
  }

  public async deleteWinner(id: number): Promise<JSON> {
    const params = {
      method: 'DELETE',
    };

    const response = await fetch(`${this.winner}/${id}`, params);
    const json = await response.json();

    return json;
  }

  public async updateWinner(id: number, item: Omit<IWinner, 'id'>): Promise<JSON> {
    const params = {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(`${this.winner}/${id}`, params);
    const json = await response.json();

    return json;
  }
}