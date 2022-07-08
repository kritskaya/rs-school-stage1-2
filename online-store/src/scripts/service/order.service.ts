import { Order } from "../model/order.model";
import { Product } from "../model/product.model";

export class OrderService {

	private order: Order;
	private onOrderChanged: Function;

	constructor() {
		this.order = new Order();
	}

	public getOrder(): Order {
		return this.order;
	}
	
	public addProduct(item: Product) {
		this.order.addItem(item);
		this.save(this.order);
	}

	public removeProduct(item: Product) {
		this.order.removeItem(item.getId());
		this.save(this.order);
	}

	private save(order: Order) {
		this.onOrderChanged(order);
		localStorage.setItem('order', JSON.stringify(order));
	}

	bindOrderChanged(callback: Function) {
		this.onOrderChanged = callback;
	}
}