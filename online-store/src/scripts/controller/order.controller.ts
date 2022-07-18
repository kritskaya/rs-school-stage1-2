import { Product, ProductPDO } from "../model/product.model";
import { OrderService } from "../service/order.service";
import { OrderView } from "../view/order/order.view";

export class OrderController {

	private service: OrderService;
	private view: OrderView;
	private clickHandler: (e: Event) => void;

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
		const target = event.currentTarget as HTMLElement;
		const productElement = target.parentElement as HTMLElement;
		
		const idElement = productElement.querySelector('.product__id') as HTMLElement;
		const id = idElement.textContent?.split(' ')[1] as string;
		
		const newItem = this.service.addProduct(id);
		const newElement = this.view.addToOrder(newItem);

		this.clickRemoveCartBtnHandler(newElement);
	}

	private clickRemoveCartBtnHandler(element: HTMLElement) {
		const removeBtn = element.querySelector('.cart-item__remove-btn') as HTMLElement;
		removeBtn.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			this.removeFromOrder(e);
		});
	}

	public removeFromOrder(event: Event): void {
		
		const target = event.target as HTMLElement;
		let productElement = target.closest('.cart__item') as HTMLElement;

		if (!productElement) {
			const productCard = target.closest('.products__item') as HTMLElement;
			const productId = productCard.dataset.id;

			const cartElement = this.view.getCartContainer();
			productElement = cartElement.querySelector(`[data-id="${productId}"]`) as HTMLElement;
		}

		const id = productElement.dataset.id as string;

		this.service.removeProduct(id);
		this.view.removeFromOrder(productElement);
	}

	public clearOrder(): void {
		this.service.clearOrder();
		this.view.removeAllFromOrder();
	}
}