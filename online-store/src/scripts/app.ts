import { AppController } from "./controller/app.controller";

export class App {
	private controller: AppController;

	constructor() {
		this.controller = new AppController();
	}

	public start(): void {
		document
			.getElementById('cart-btn')
			?.addEventListener('click', (e) => {
				this.controller.getOrderController().toggleOrderList();
				e.stopImmediatePropagation();
			});
	}
}