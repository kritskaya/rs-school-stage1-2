import { ProductService } from "./service/product.service";

export class App {

	public start(): void {
		new ProductService();
	}
}