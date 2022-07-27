import { ApiService } from "./api.service";

export class App {

	public async start(): Promise<void> {
		const api = new ApiService();
		const cars = await api.getCars();
		console.log(cars);

		const car = await api.getCar(1);
		console.log(car);

		// const car2 = await api.createCar({name: 'Lada', color: '#000000'});
		// console.log(car2);

		// const code = await api.deleteCar(9);
		// console.log(code);

		const code2 = await api.updateCar(6, {name: 'Moskvich', color: '#ffffff'});
		console.log(code2);
	}	

}