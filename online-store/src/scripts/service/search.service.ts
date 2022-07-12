import { Product } from "../model/product.model";
import { Search } from "../model/search.model";

export class SearchService {
	private currentSearch: Search;

	constructor() {
		this.currentSearch = new Search('');
	}
	
	public search(products: Product[]): Product[] | string {
		
		return products.filter((item) => {
			const request = this.currentSearch.getRequest().toLowerCase();

			const nameResult = item.getName().indexOf(request);
			const titleRequest = item.getDescription().indexOf(request);

			return nameResult >= 0 || titleRequest >=0;
		})
	}

	public clearSearch() {
		this.currentSearch = new Search('');
	}

	public setCurrentSearch(search: Search): void {
		this.currentSearch = search;
	}

	public getCurrentSearch(): Search {
		return this.currentSearch;
	}

}