import { OrderController } from "./order.controller";
import { ProductController } from "./product.controller";

export class AppController {
	private productContoller: ProductController;
	private orderController: OrderController;

	constructor() {
		this.productContoller = new ProductController();
		this.orderController = new OrderController();
	}

	public toggleOrderList(): void {
		this.orderController.toggleOrderList();
	}

	public addToOrder(event: Event): void {
		this.orderController.addToOrder(event);
	}

	public removeFromOrder(event: Event): void {
		this.orderController.removeFromOrder(event);
	}
}