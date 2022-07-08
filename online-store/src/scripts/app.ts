import { ProductService } from "./service/product.service";
import { ProductView } from "./view/product.view";

export class App {

	public start(): void {
		const service = new ProductService();
		new ProductView(service.getProducts());
	}
}