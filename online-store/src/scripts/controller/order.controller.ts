import { OrderService } from "../service/order.service";
import { OrderView } from "../view/order/order.view";

export class OrderController {

	private service: OrderService;
	private view: OrderView;

	constructor() {
		this.service = new OrderService();
		this.view = new OrderView(this.service.getOrder());
	}

	public getService(): OrderService {
		return this.service;
	}

	public toggleOrderList():void {
		
	}
}