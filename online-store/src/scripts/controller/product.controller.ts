import { ProductPDO } from "../model/product.model";
import { ProductService } from "../service/product.service";
import { ProductView } from "../view/product.view";

export class ProductController {

	private service: ProductService;
	private view: ProductView;

	constructor() {
		this.service = new ProductService();
		this.view = new ProductView(this.service.getProducts());
	}

	public loadFromStorage(): void {
		const storage = JSON.parse(localStorage.getItem('order') as string);
		
		storage.forEach((item: ProductPDO) => {
			const root = this.view.getRootContainer();
			const element = root.querySelector(`[data-id="${item.id}"]`) as HTMLElement;
			const btn = element.querySelector('.product__btn') as HTMLElement;
			btn.classList.add('cart-btn_remove');
			
			this.view.addInCartBadge(element);
		});
	}

	// public toggleInCart(event: Event) {
	// 	const target = event.currentTarget as HTMLElement;
	// 	const productElement = target.parentElement as HTMLElement;

	// 	this.view.toggleInCart(productElement);
	// }

	public addInCartBadge(event: Event) {
		const target = event.currentTarget as HTMLElement;
		const productElement = target.parentElement as HTMLElement;

		this.view.addInCartBadge(productElement);
	}

	public removeInCartBadge(event: Event) {
		const target = event.currentTarget as HTMLElement;
		const productElement = target.parentElement as HTMLElement;

		this.view.removeInCartBadge(productElement);
	}
}