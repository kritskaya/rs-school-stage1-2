import { OrderController } from "./order.controller";
import { ProductController } from "./product.controller";
import { SortController } from "./sort.controller";

export class AppController {
	private productContoller: ProductController;
	private orderController: OrderController;
	private sortController: SortController;

	constructor() {
		this.productContoller = new ProductController();
		this.orderController = new OrderController();
		this.sortController = new SortController();

		if (localStorage.getItem('order')) {
			this.orderController.loadFromStorage();
			this.productContoller.loadFromStorage();
		}
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

	public toogleOrderItem(event: Event): void {
		this.orderController.toggleOrderItem(event);
		this.productContoller.toggleInCart(event);
	}

	public toggleSortList(event: Event): void {
		this.sortController.toggleSortList(event);
	}
}