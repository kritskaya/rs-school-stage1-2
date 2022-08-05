import { Order } from "../model/order.model";
import { Product, ProductPDO } from "../model/product.model";
import productsData from '../../assets/json/products.json';

export class OrderService {
	private order: Order;

	constructor() {
		this.order = new Order();
	}

	public getOrder(): Order {
		return this.order;
	}
	
	public addProduct(productId: string): Product {
		const product = productsData.find((item) => item.id === productId) as ProductPDO;

		const id = product.id;
		const name = product.name;
		const price = parseInt(product.price);
		const color = product.color;
		const quantity = parseInt(product.quantity);
		const size = product.size;
		const material = product.material;
		const keywords = product.keywords;
		const description = product.title;
		const image = product.image;
		const popular = product.popular;

		const item = new Product(id, name, price, color, quantity, size, material, 
			keywords, description, image, popular);

		this.order.addItem(item);
		this.saveToLocalStorage();
		
		return item;
	}

	public removeProduct(id: string) {
		this.order.removeItem(id);
		this.saveToLocalStorage();
	}

	public clearOrder(): void {
		this.order.removeAllItems();
	}

	private saveToLocalStorage() {
		localStorage.setItem('order', JSON.stringify(this.order.getProducts()));
	}
}