import { AppController } from "./controller/app.controller";
import { ProductService } from "./service/product.service";
import { ProductView } from "./view/product.view";

export class App {

	private controller: AppController;

	public start(): void {
		this.controller = new AppController();
	}
}