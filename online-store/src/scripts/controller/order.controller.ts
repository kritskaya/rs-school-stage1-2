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

		if (localStorage.getItem('order')) {
			this.loadFromStorage();
		}
	}

	private loadFromStorage(): void {
		const storage = JSON.parse(localStorage.getItem('order') as string);
		console.log(storage);

		storage.forEach((item: ProductPDO) => {
			const storageItem = this.service.addProduct(item.id);
			const storageElement = this.view.addToOrder(storageItem);
			this.clickRemoveCartBtnHandler(storageElement);
		});
	}

	public toggleOrderList(): void {
		this.view.toggleOrderList();

		this.clickHandler = this.clickOutsideOrderHandler.bind(this);

		if (this.view.getCartContainer().classList.contains('active')) {
			document.addEventListener('click', this.clickHandler);
		} 
	}

	private clickOutsideOrderHandler(event: Event): void {
		event.stopImmediatePropagation();

		const target = event.target as Element;
		if (!target.closest('.cart__list') && 
			!target.closest('.cart__btn') &&
			!target.closest('.product__btn') &&
			!target.closest('.cart-item__remove-btn')) {
			this.view.toggleOrderList();
			document.removeEventListener('click', this.clickHandler);
		}
		
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
			this.removeFromOrder(e);
		});
	}

	public removeFromOrder(event: Event): void {
		
		const target = event.target as HTMLElement;
		const productElement = target.closest('.cart__item') as HTMLElement;
		const id = productElement.dataset.id as string;

		this.service.removeProduct(id);
		this.view.removeFromOrder(productElement);
	}
}