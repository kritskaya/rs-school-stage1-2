import { OrderService } from "../service/order.service";
import { OrderView } from "../view/order/order.view";

export class OrderController {

	private service: OrderService;
	private view: OrderView;

	constructor() {
		this.service = new OrderService();
		this.view = new OrderView(this.service.getOrder());
	}

	public getService(): OrderService {
		return this.service;
	}

	public getView(): OrderView {
		return this.view;
	}

	public toggleOrderList(): void {
		this.view.toggleOrderList();

		if (this.view.getCartContainer().classList.contains('active')) {
			document.addEventListener('click', this.clickHandler.bind(this));
		} else {
			document.removeEventListener('click', this.clickHandler.bind(this));
		}
	}

	private clickHandler(event: Event) {
		event.stopImmediatePropagation();

		const target = event.target as Element;
		if (!target.closest('cart__list') || !target.closest('cart__btn')) {
			this.view.toggleOrderList();
		}
	}
}