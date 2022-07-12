import { Product } from "../model/product.model";
import { Search } from "../model/search.model";
import { SearchService } from "../service/search.service";
import { SearchView } from "../view/search/search.view";

export class SearchController {
	private service: SearchService;
	private view: SearchView;

	constructor() {
		this.service = new SearchService();
		this.view = new SearchView();
	}

	public startSearch(request: string, products: Product[]): Product[] {
		this.service.setCurrentSearch(new Search(request));
		const result = this.service.search(products);

		this.view.showSearchInfo(this.service.getCurrentSearch(), result.length);

		return result;
	}

	public clearSearch() {
		this.service.clearSearch();
		this.view.clearSearchInfo();
	}
}