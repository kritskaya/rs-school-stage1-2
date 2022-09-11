import { Product } from "../../model/product.model";
import './product.css';

export class ProductView {
	private root: HTMLElement;

	constructor(products: Product[]) {
		this.root = document.getElementById('product-container')!;
		if (!this.root) return;

		for (let i = 0; i < products.length; i++) 	{
			const productImgs = <HTMLAnchorElement>this.createElement('a', 'product__imgs');
			productImgs.href = '#';
			
			const img = <HTMLImageElement>this.createElement('img', 'product__img');
			img.src = `./assets/img/products/${products[i].getImage()}.jpg`;
			img.alt = 'product image';

			const img2 = <HTMLImageElement>this.createElement('img', 'product__img_hover');
			img2.src = `./assets/img/products/${products[i].getImage()}_hover.jpg`;
			img2.alt = 'product image';

			productImgs.append(img, img2);

			const title = this.createElement('h3', 'product__title');
			title.textContent = products[i].getName();

			const description = this.createElement('p', 'product__description');
			description.textContent = `${products[i].getDescription()}, ${products[i].getColor()}, ${products[i].getSize()}`;

			const id = this.createElement('p', 'product__id');
			id.textContent = `Артикул: ${products[i].getId()}`;

			const quantity = this.createElement('p', 'product__amount');
			quantity.textContent = `На складе: ${products[i].getQuantity()}`;

			const popular = this.createElement('p', 'product__popular');
			popular.textContent = `Популярный: ${products[i].getPopular()}`;

			const materials = this.createElement('p', 'product__materials');
			materials.textContent = `Материалы: ${products[i].getMaterial().join(', ')}`;

			const price = this.createElement('p', 'product__price');
			price.textContent = `${products[i].getPrice()} P`;

			const btn = this.createElement('button', 'product__btn cart-btn');
			btn.title = 'Добавить в корзину';

			const btnImg = <HTMLImageElement>this.createElement('img', 'cart-btn__img');
			btnImg.src = './assets/icon/shopping-cart.png';
			btnImg.alt = 'add to cart'

			btn.append(btnImg);

			const product = this.createElement('div', 'products__item product');
			product.dataset.id = products[i].getId();

			product.append(productImgs, title, description, id);
			product.append(quantity, popular, materials, price, btn);

			this.root.append(product);
		}

		const messageElement = this.createElement('div', 'order-error')
		messageElement.textContent = 'Извините, все слоты заполнены';
		document.body.append(messageElement);
	}

	public getRootContainer(): HTMLElement {
		return this.root;
	} 
	
	public addInCartBadge(element: HTMLElement): void {
		const inCart = document.createElement('p');
		inCart.className = 'product__in-cart';
		inCart.textContent = 'Товар в корзине';
		element.append(inCart);
	}

	public removeInCartBadge(element: HTMLElement): void {
		const inCart = element.querySelector<HTMLElement>('.product__in-cart');

		if (inCart) {
			inCart.remove();
		} 
	}

	public removeAllBadges(): void {
		const cards = document.querySelectorAll<HTMLElement>(`.product`);
		cards.forEach((card) => {
			const btn = card.querySelector<HTMLElement>('.cart-btn');
			const badgeInCart = card.querySelector<HTMLElement>('.product__in-cart');

			if (badgeInCart && btn) {
				badgeInCart.remove();
				btn.classList.remove('cart-btn_remove');
			}
		});	
	}

	public noAvailableSlot(): void {
		const error = document.querySelector<HTMLElement>('.order-error');

		if (error) {
			error.classList.add('active');

			setTimeout(() => error.classList.remove('active'), 3000);
		}
	}

	public displayProducts(sortProducts: Product[]): void {
		const noProductsError = this.root.querySelector<HTMLElement>('.products__error');
		if (noProductsError) {
			noProductsError.remove();
		}
		
		// sort
		sortProducts.forEach((item) => {
			const id = item.getId();
			const displayedItem = this.root.querySelector<HTMLElement>(`.product[data-id="${id}"]`);

			if (displayedItem) {
				this.root.append(displayedItem);
			}
		});

		// search + filters
		const allProducts = this.root.children;
		Array.from(allProducts).forEach((product) => {
			const element = <HTMLElement>product;
			const id = element.dataset.id;
			const visibleElement = sortProducts.find((item) => item.getId() === id);
			
			if (visibleElement) {
				element.style.display = 'block';
			} else {
				element.style.display = 'none';
			}
		});

		if (!sortProducts.length) {
			const noProducts = this.createElement('p', 'products__error');
			noProducts.textContent = 'Извините, совпадений не обнаружено';

			this.root.prepend(noProducts);
		}
		
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element;
	}
	
}