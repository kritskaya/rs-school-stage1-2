import { Order } from "../../model/order.model";
import { Product } from "../../model/product.model";
import './order.css';

export class OrderView {
	private root: HTMLElement;
	private counter: HTMLElement;

	constructor(order: Order) {
		const parent = document.getElementById('cart-container') as HTMLElement;

		const products = order.getOrder();

		this.root = this.createElement('ul', 'cart__list');
		
		if (!products.length) {
			this.renderNoOrder();
		}

		products.forEach((product) => {
			this.renderOrderItem(product);
		});

		parent.append(this.root);
	}

	private renderOrderItem(product: Product): HTMLElement {
		const itemPresence = this.root.querySelector('.cart-item__img')
		if (!itemPresence) {
			this.root.innerHTML = '';
			this.renderCounter();
			this.counter.textContent = '0';
		}

		const quantity = this.counter.textContent as string;
		this.counter.textContent = `${+quantity + 1}`;

		const item = this.createElement('li', 'cart__item cart-item');
		item.dataset.id = product.getId();
			
		const img = this.createElement('img', 'cart-item__img') as HTMLImageElement;
		img.src = `./assets/img/products/${product.getImage()}_hover.jpg`;
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
		removeBtn.textContent = '×';
		removeBtn.title = 'удалить товар';

		item.append(img, description, price, removeBtn);
		this.root.append(item);

		return item;
	}

	private renderNoOrder() {
		const noOrder = this.createElement('li', 'cart__item item');
		noOrder.textContent = 'Корзина пуста';
		this.root.append(noOrder);
	}

	private renderCounter() {
		const parent = document.getElementById('cart-container') as HTMLElement;

		this.counter = this.createElement('div', 'cart__info');
		parent.append(this.counter);
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

	public addToOrder(product: Product): HTMLElement {
		return this.renderOrderItem(product);
	}

	public removeFromOrder(productElement: HTMLElement): void {
		productElement.remove();

		const quantity = this.counter.textContent as string;
		this.counter.textContent = `${+quantity - 1}`;
		
		if (!this.root.firstElementChild) {
			this.renderNoOrder();
			this.counter.remove();
		}
	}

}