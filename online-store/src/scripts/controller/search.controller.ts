import { Product } from "../model/product.model";
import { SearchService } from "../service/search.service";
import { SearchView } from "../view/search/search.view";

export class SearchController {
	private service: SearchService;
	private view: SearchView;

	constructor() {
		this.service = new SearchService();
		this.view = new SearchView();
	}

	public startSearch(request: string, products: Product[]): void {
		this.view.showSearchInfo(request, products.length);
	}

	public clearSearch(): void {
		this.view.clearSearchInfo();
	}
}