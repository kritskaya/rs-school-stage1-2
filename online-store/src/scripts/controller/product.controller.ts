import { Product, ProductPDO } from "../model/product.model";
import { RangeFilter, RangeFilterType } from "../model/range.filter.model";
import { Search } from "../model/search.model";
import { Sort } from "../model/sort.model";
import { ValueFilter, ValueFilterType } from "../model/value.filter.model";
import { ProductService } from "../service/product.service";
import { ProductView } from "../view/product/product.view";

export class ProductController {

	private service: ProductService;
	private view: ProductView;

	constructor() {
		this.service = new ProductService();
		this.view = new ProductView(this.service.getDisplayedProducts());
	}

	public loadFromStorage(): void {
		const storage = JSON.parse(localStorage.getItem('order') as string);
		
		storage.forEach((item: ProductPDO) => {
			const root = this.view.getRootContainer();
			const element = root.querySelector(`[data-id="${item.id}"]`) as HTMLElement;
			const btn = element.querySelector('.product__btn') as HTMLElement;
			btn.classList.add('cart-btn_remove');
			
			this.view.addInCartBadge(element);
		});
	}

	public addInCartBadge(event: Event) {
		const target = event.currentTarget as HTMLElement;
		const productElement = target.parentElement as HTMLElement;

		this.view.addInCartBadge(productElement);
	}

	public removeInCartBadge(event: Event) {
		const target = event.currentTarget as HTMLElement;
		const productElement = target.parentElement as HTMLElement;

		this.view.removeInCartBadge(productElement);
	}

	public displayProducts(): void {
		this.view.displayProducts(this.service.getDisplayedProducts());
	}

	public getDisplayedProducts(): Product[] {
		return this.service.getDisplayedProducts();
	} 

	public setDisplayedProducts(products: Product[]): void {
		this.service.setDisplayedProducts(products);
	}

	/* sort */

	public getCurrentSort(): Sort {
		return this.service.getCurrentSort();
	}

	public setCurrentSort(sort: Sort): void {
		this.service.setCurrentSort(sort);
		this.displayProducts();
	}
	
	/* end sort */

	/* filters */

	public addCurrentValueFilter(filter: ValueFilter<ValueFilterType>): void {
		this.service.addCurrentValueFilter(filter);
		this.displayProducts();
	}

	public removeCurrentValueFilter(filterType: ValueFilterType): void {
		this.service.removeCurrentValueFilter(filterType);
		this.displayProducts();
	}

	public getCurrentValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.service.getCurrentValueFilters();
	}

	public addCurrentRangeFilter(filter: RangeFilter): void {
		this.service.addCurrentRangeFilter(filter);
	}

	/* end filters*/

	/* search */

	public addSearchFilter(request: string): void {
		this.service.setCurrentSearch(new Search(request));
		this.displayProducts();
	}

	public clearSearchFilter() {
		this.service.clearSearchFilter();
		this.displayProducts();
	}

	/* end search */
}