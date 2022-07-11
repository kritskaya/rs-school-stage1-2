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
		this.productContoller.addInCartBadge(event);
	}

	public removeFromOrder(event: Event): void {
		const itemToRemoveBadge = this.orderController.removeFromOrder(event);
		this.productContoller.removeInCartBadge(event);
	}

	public toogleOrderItem(event: Event): void {
		const target = event.target as HTMLElement;

		const isRemoveBtn = target.closest('.cart-btn_remove');
		if (isRemoveBtn) {
			this.removeFromOrder(event);
			isRemoveBtn.classList.remove('cart-btn_remove');
			//this.productContoller.removeInCartBadge(event);
		} else {
			this.addToOrder(event);
			const isAddBtn = target.closest('.cart-btn') as HTMLElement;
			isAddBtn.classList.add('cart-btn_remove');
		}
		
	}

	public toggleSortList(event: Event): void {
		this.sortController.toggleSortList(event);
	}
}