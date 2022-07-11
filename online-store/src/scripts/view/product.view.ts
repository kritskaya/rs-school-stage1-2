import { Product } from "../model/product.model";
import './product.css';

export class ProductView {
	private root: HTMLElement;

	constructor(products: Product[]) {
		this.root = document.getElementById('product-container') as HTMLElement;

		for (let i = 0; i < products.length; i++) 	{
			const productImgs = document.createElement('a');
			productImgs.className = 'product__imgs';
			productImgs.href = '#';
			
			const img = document.createElement('img');
			img.className = 'product__img';
			img.src = `./assets/img/products/${products[i].getImage()}.jpg`;
			img.alt = 'product image';

			const img2 = document.createElement('img');
			img2.className = 'product__img_hover';
			img2.src = `./assets/img/products/${products[i].getImage()}_hover.jpg`;
			img2.alt = 'product image';

			productImgs.append(img, img2);

			const title = document.createElement('h3');
			title.className = 'product__title';
			title.textContent = products[i].getName();

			const description = document.createElement('p');
			description.className = 'product__description';
			description.textContent = `${products[i].getDescription()}, ${products[i].getColor()}, ${products[i].getSize()}`;

			const id = document.createElement('p');
			id.className = 'product__id';
			id.textContent = `Артикул: ${products[i].getId()}`;

			const quantity = document.createElement('p');
			quantity.className = 'product__amount';
			quantity.textContent = `На складе: ${products[i].getQuantity()}`;

			const materials = document.createElement('p');
			materials.className = 'product__materials';
			materials.textContent = `Материалы: ${products[i].getMaterial()}`;

			const price = document.createElement('p');
			price.className = 'product__price';
			price.textContent = `${products[i].getPrice()}`;

			const btn = document.createElement('button');
			btn.className = 'product__btn cart-btn';
			btn.title = 'Добавить в корзину';

			const btnImg = document.createElement('img');
			btnImg.className = 'cart-btn__img';
			btnImg.src = './assets/icon/shopping-cart.png';
			btnImg.alt = 'add to cart'

			btn.append(btnImg);

			const product = document.createElement('div');
			product.className = 'products__item product';
			product.dataset.id = products[i].getId();

			product.append(productImgs, title, description, id);
			product.append(quantity, materials, price, btn);

			this.root.append(product);
		}
	}

	public addInCartBadge(element: HTMLElement): void {
		let inCart = element.querySelector('.product__in-cart') as HTMLElement;
		
		inCart = document.createElement('p');
		inCart.className = 'product__in-cart';
		inCart.textContent = 'Товар в корзине';
		element.append(inCart);
	}

	public removeInCartBadge(element: HTMLElement): void {
		let inCart = element.querySelector('.product__in-cart') as HTMLElement;

		if (inCart) {
			inCart.remove();
		} 
	}

	public getRootContainer(): HTMLElement {
		return this.root;
	} 
	
}