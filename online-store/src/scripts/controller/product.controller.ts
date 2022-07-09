import { ProductService } from "../service/product.service";
import { ProductView } from "../view/product.view";

export class ProductController {

	private service: ProductService;
	private view: ProductView;

	constructor() {
		this.service = new ProductService();
		this.view = new ProductView(this.service.getProducts());
	}
}