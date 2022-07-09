import { Order } from "../../model/order.model";
import './order.css';

export class OrderView {
	private root: HTMLElement;

	constructor(order: Order) {
		const parent = document.getElementById('cart-container') as HTMLElement;

		const products = order.getOrder();
		console.log(products);

		const cartList = this.createElement('ul', 'cart__list');
		this.root = cartList;
		
		if (!products.length) {
			const noOrder = this.createElement('li', 'cart__item item');
			noOrder.textContent = 'Корзина пуста';
			cartList.append(noOrder);
		}

		products.forEach((product) => {
			const item = this.createElement('li', 'cart__item cart-item');
			
			const img = this.createElement('img', 'cart-item__img') as HTMLImageElement;
			img.src = `./assets/img/products/${product.getImage}_hover.jpg`;
			img.alt = 'order item img';

			const description = this.createElement('div', 'cart-item__description');

			const name = this.createElement('p', 'cart-item__name');
			name.textContent = product.getName();

			const title = this.createElement('p', 'cart-item__title');
			title.textContent = product.getDescription();

			description.append(name, title);

			const price = this.createElement('p', 'cart-item__price');
			price.textContent = product.getPrice().toString();

			const removeBtn = this.createElement('button', 'cart-item__remove-btn');

			item.append(img, description, price, removeBtn);
			cartList.append(item);
		});

		parent.append(cartList);
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element
	}
	
	public toggleOrderList(): void {
		this.root.classList.toggle('active');
	}

	public getCartContainer(): HTMLElement {
		return this.root;
	}

}