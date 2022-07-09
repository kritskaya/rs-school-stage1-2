import { OrderController } from "./order.controller";
import { ProductController } from "./product.controller";

export class AppController {
	private productContoller: ProductController;
	private orderController: OrderController;

	constructor() {
		this.productContoller = new ProductController();
		this.orderController = new OrderController();
	}

	public getProductController(): ProductController {
		return this.productContoller;
	}

	public getOrderController(): OrderController {
		return this.orderController;
	}
}