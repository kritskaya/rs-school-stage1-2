import { ProductController } from "./product.controller";

export class AppController {
	private productContoller: ProductController;

	constructor() {
		this.productContoller = new ProductController();
	}
}