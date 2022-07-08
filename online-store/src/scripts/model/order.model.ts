
import { Product } from "./product.model";

export class Order {

	private products: Product[];

	constructor() {
		this.products = [];
	}

	public getOrder(): Product[] {
		return this.products;
	}

	public addItem(item: Product): void {
		this.products.push(item);
	}

	public removeItem(id: string): void {
		for(let i = 0; i < this.products.length; i++) {
			if (this.products[i].getId() === id) {
				this.products.splice(i, 1) ;
			}
		}
	}
}