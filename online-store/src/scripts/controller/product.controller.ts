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
		const jsonOrder = localStorage.getItem('order');
		
		if (jsonOrder) {
			const order = JSON.parse(jsonOrder);
			
			order.forEach((item: ProductPDO) => {
				const root = this.view.getRootContainer();
				const element = root.querySelector(`[data-id="${item.id}"]`) as HTMLElement;
				const btn = element.querySelector('.product__btn') as HTMLElement;
				btn.classList.add('cart-btn_remove');
				
				this.view.addInCartBadge(element);
			});
		}
		
		const jsonSearch = localStorage.getItem('search');

		if (jsonSearch) {
			const request = JSON.parse(jsonSearch);
			this.addSearchFilter(request);
		} else {
			this.addSearchFilter('');
		}

		const jsonSort = localStorage.getItem('sort');

		if (jsonSort) {
			const sort = JSON.parse(jsonSort);
			//this.setCurrentSort(new Sort(sort.title, sort.field, sort.));
			this.service.setCurrentSort(new Sort(sort.title, sort.field, sort.asc));
			this.displayProducts();
		}
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

	public noAvailableSlot(): void {
		this.view.noAvailableSlot();
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

	public saveToStorage(sort: Sort) {
		localStorage.setItem('sort', JSON.stringify(sort));
	}
	
	/* end sort */

	/* filters */

	public addCurrentValueFilter(filter: ValueFilter<ValueFilterType>): void {
		this.service.addCurrentValueFilter(filter);
		this.displayProducts();
		const itemsForStore = Array.from(this.service.getCurrentValueFilters().values());
		localStorage.setItem('value-filters', JSON.stringify(itemsForStore));
	}

	public removeCurrentValueFilter(filterType: ValueFilterType): void {
		this.service.removeCurrentValueFilter(filterType);
		this.displayProducts();
		const itemsForStore = Array.from(this.service.getCurrentValueFilters().values());
		localStorage.setItem('value-filters', JSON.stringify(itemsForStore));
	}

	public getCurrentValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.service.getCurrentValueFilters();
	}

	public setCurrentFilters(valueFilters: Map<ValueFilterType, ValueFilter<ValueFilterType>>, 
		rangeFilters: Map<RangeFilterType, RangeFilter>): void {
		this.service.setCurrentFilters(valueFilters, rangeFilters);
		this.displayProducts();
	}

	public addCurrentRangeFilter(filter: RangeFilter): void {
		this.service.addCurrentRangeFilter(filter);
		this.displayProducts();
		const itemsForStore = Array.from(this.service.getCurrentRangeFilters().values());
		localStorage.setItem('range-filters', JSON.stringify(itemsForStore));
	}

	public getCurrentRangeFilters(): Map<RangeFilterType, RangeFilter> {
		return this.service.getCurrentRangeFilters();
	}

	public clearAllFilters() {
		this.service.clearAllFilters();
		this.displayProducts();
		localStorage.removeItem('value-filters');
		localStorage.removeItem('range-filters');
	}

	/* end filters*/

	/* search */

	public addSearchFilter(request: string): void {
		this.service.setCurrentSearch(new Search(request));
		this.displayProducts();
		localStorage.setItem('search', JSON.stringify(request));
	}

	public clearSearchFilter() {
		this.service.clearSearchFilter();
		this.displayProducts();
		localStorage.removeItem('search');
	}

	/* end search */

}