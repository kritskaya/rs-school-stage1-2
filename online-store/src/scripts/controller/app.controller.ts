import { RangeFilter, RangeFilterType } from "../model/range.filter.model";
import { ValueFilterType } from "../model/value.filter.model";
import { SortType } from "../service/sort.service";
import { FilterController } from "./filter.controller";
import { OrderController } from "./order.controller";
import { ProductController } from "./product.controller";
import { SearchController } from "./search.controller";
import { SortController } from "./sort.controller";

export class AppController {
	private productController: ProductController;
	private orderController: OrderController;
	private sortController: SortController;
	private searchController: SearchController;
	private filterController: FilterController;
	private static CART_LIMIT = 20;

	constructor() {
		this.sortController = new SortController();
		const sort = this.sortController.getSort(SortType.AscPopular);
		
		this.productController = new ProductController();
		this.productController.setCurrentSort(sort);

		this.orderController = new OrderController();
		this.searchController = new SearchController();
		this.filterController = new FilterController();

		this.orderController.loadFromStorage();
		this.productController.loadFromStorage();
		if (!this.productController.getCurrentSort()) {
			this.productController.setCurrentSort(sort);
		}
		
		this.sortController.loadFromStorage();
		
		const valueFilters = this.filterController.loadValueFiltersFromStorage();
		const rangeFilters = this.filterController.loadRangeFiltersFromStorage();
		this.productController.setCurrentFilters(valueFilters, rangeFilters);
	}

	public toggleOrderList(): void {
		this.orderController.toggleOrderList();
	}

	public addToOrder(event: Event): void {
		this.orderController.addToOrder(event);
		this.productController.addInCartBadge(event);
	}

	public removeFromOrder(event: Event): void {
		this.orderController.removeFromOrder(event);
		this.productController.removeInCartBadge(event);
	}

	public toggleOrderItem(event: Event): void {
		const target = event.target as HTMLElement;

		const isRemoveBtn = target.closest<HTMLElement>('.cart-btn_remove');
		if (isRemoveBtn) {
			this.removeFromOrder(event);
			isRemoveBtn.classList.remove('cart-btn_remove');
		} else {
			
			const order = this.orderController.getCounter();
			
			if (!order || Number(order.textContent) < AppController.CART_LIMIT) {
				this.addToOrder(event);
				const isAddBtn = target.closest<HTMLElement>('.cart-btn');
				isAddBtn?.classList.add('cart-btn_remove');
			} else {
				this.productController.noAvailableSlot();
			}
		}
	}

	public clearSettings() {
		localStorage.clear();

		// sort
		const sort = this.sortController.getSort(SortType.AscPopular);
		this.productController.setCurrentSort(sort);

		// filters
		this.clearAllFilters();

		// order
		this.orderController.clearOrder();
		this.productController.removeAllBadges();

		localStorage.clear();
	}

	/* sort */

	public toggleSortList(target: HTMLElement): void {
		this.sortController.toggleSortList(target);
	}

	public selectSortItem(event: Event): void {
		const target = event.target as HTMLElement;
		const sortType = target.dataset.sort;

		if (sortType) {
			const sort = this.sortController.getSort(+sortType);
			this.productController.setCurrentSort(sort);
			this.productController.saveToStorage(sort);
		}
	}

	/* end sort */

	/* filter */

	public toggleFilterList(target: HTMLElement): void {
		this.filterController.toggleFilterList(target);
	}

	public selectValueFilterItem(event: Event): void {
		const target = event.target as HTMLInputElement;
		const filterType = target.dataset.filter;

		if (filterType) {
			if (target.checked) {
				this.addValueFilter(<ValueFilterType>filterType);
			} else {
				this.removeValueFilter(<ValueFilterType>filterType);
			}
		}
	}

	public addValueFilter(filterType: ValueFilterType): void {		
		const filter = this.filterController.getValueFilter(filterType);
		this.productController.addCurrentValueFilter(filter);
		this.filterController.addActiveValueFilterState(filterType);
	}

	public removeValueFilter(filterType: ValueFilterType): void {
		this.productController.removeCurrentValueFilter(filterType);
		this.filterController.removeActiveValueFilterState(filterType);
	}

	public addRangeFilter(range: number[], type: RangeFilterType): void {		
		const filter = new RangeFilter(range[0], range[1], type);
		this.productController.addCurrentRangeFilter(filter);
		this.filterController.addActiveRangeFilterState(type);
	}

	public clearAllFilters() {
		this.productController.clearAllFilters();
		this.filterController.clearAllFilters();
	}

	/* end filter */

	/* search */

	public addSearchFilter(): void {
		const searchInput = document.querySelector<HTMLInputElement>('.search__input');
		const request = searchInput?.value;

		if (request) {
			this.productController.addSearchFilter(request);
			const displayedProducts = this.productController.getDisplayedProducts();
			this.searchController.startSearch(request, displayedProducts.length);
		}
	}

	public clearSearchFilter(): void {
		this.searchController.clearSearch();
		this.productController.addSearchFilter('');
	}	

	/* end search */
}