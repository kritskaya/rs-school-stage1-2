import { Car, ICar } from "./model/car.model";

export class ApiService {
	private base: string = 'http://127.0.0.1:3000';
	private garage: string = `${this.base}/garage`;

	public async getCars(page: number = 1, limit: number = 7) {
		const response = await fetch(`${this.garage}?_page=${page}&_limit${limit}`);
		const cars = await response.json();
		return cars;
	}

	public async getCar(id: number): Promise<ICar> {
		const response = await fetch(`${this.garage}/${id}`);
		const car = await response.json();
		return car;
	}

	public async createCar(item: Omit<ICar, "id">) {
		const params = {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'Content-type': 'application/json'
			}
		}
		const response = await fetch(this.garage, params);
		const car = await response.json();
		return car;
	}

	public async deleteCar(id: number): Promise<number> {
		const params = {
			method: 'DELETE',
		}
		const response = await fetch(`${this.garage}/${id}`, params);
		const data = await response.json();
		const code = await response.status;
		return code;
	}

	public async updateCar(id: number, item: Omit<ICar, 'id'>): Promise<number> {
		const params = {
			method: 'PUT',
			body: JSON.stringify(item),
			headers: {
				'Content-type': 'application/json'
			}
		}

		const response = await fetch(`${this.garage}/${id}`, params);
		const code = await response.status;
		return code;
	}
}