import { ProductPDO } from "../model/product.model";
import { OrderService } from "../service/order.service";
import { OrderView } from "../view/order/order.view";

export class OrderController {

	private service: OrderService;
	private view: OrderView;
	
	constructor() {
		this.service = new OrderService();
		this.view = new OrderView(this.service.getOrder());
	}

	public getCounter(): HTMLElement {
		return this.view.getCounter();
	}

	public loadFromStorage(): void {
		const jsonOrder = localStorage.getItem('order');

		if  (jsonOrder) {
			const order = JSON.parse(jsonOrder);

			order.forEach((item: ProductPDO) => {
				const storageItem = this.service.addProduct(item.id);
				const storageElement = this.view.addToOrder(storageItem);
				this.clickRemoveCartBtnHandler(storageElement);
			});
		}		
	}

	public toggleOrderList(): void {
		this.view.toggleOrderList(); 
	}

	public addToOrder(event: Event): void {
		const target = event.target as HTMLElement;
		
		const productCard = target.closest<HTMLElement>('.products__item');
		const id = productCard?.dataset.id;
		
		if (id) {
			const newItem = this.service.addProduct(id);
			const newElement = this.view.addToOrder(newItem);
			this.clickRemoveCartBtnHandler(newElement);
		}

	}

	private clickRemoveCartBtnHandler(element: HTMLElement) {
		const removeBtn = element.querySelector<HTMLElement>('.cart-item__remove-btn');
		removeBtn?.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			this.removeFromOrder(e);
		});
	}

	public removeFromOrder(event: Event): void {
		
		const target = event.target as HTMLElement;
		let productElement = target.closest<HTMLElement>('.cart__item');

		if (!productElement) {
			const productCard = target.closest<HTMLElement>('.products__item');
			const productId = productCard?.dataset.id;

			const cartElement = this.view.getCartContainer();

			productElement = cartElement.querySelector<HTMLElement>(`[data-id="${productId}"]`);
		}

		if (productElement) {
			const id = productElement.dataset.id as string;

			this.service.removeProduct(id);
			this.view.removeFromOrder(productElement);
		}
	}

	public clearOrder(): void {
		this.service.clearOrder();
		this.view.removeAllFromOrder();
	}
}