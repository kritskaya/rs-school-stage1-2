
import { Product } from "./product.model";

export class Order {

	private products: Product[];

	constructor() {
		this.products = [];
	}

	public getOrder(): Product[] {
		return this.products;
	}

	public setOrder(products: Product[]): void {
		this.products = products;
	}
}