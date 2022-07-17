import { RangeFilter } from "../model/range.filter.model";
import { Sort } from "../model/sort.model";
import { SizeFilterType, ValueFilter, ValueFilterType } from "../model/value.filter.model";
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
		
		const products = this.productController.getDisplayedProducts();
		this.searchController.loadFromStorage(products);
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
		const itemToRemoveBadge = this.orderController.removeFromOrder(event);
		this.productController.removeInCartBadge(event);
	}

	public toggleOrderItem(event: Event): void {
		const target = event.target as HTMLElement;

		const isRemoveBtn = target.closest('.cart-btn_remove');
		if (isRemoveBtn) {
			this.removeFromOrder(event);
			isRemoveBtn.classList.remove('cart-btn_remove');
			//this.productContoller.removeInCartBadge(event);
		} else {
			
			const order = this.orderController.getCounter();
			
			if (!order || Number(order.textContent) < 5) {
				this.addToOrder(event);
				const isAddBtn = target.closest('.cart-btn') as HTMLElement;
				isAddBtn.classList.add('cart-btn_remove');
			} else {
				this.productController.noAvailableSlot();
			}
		}
	}

	/* sort */

	public toggleSortList(target: HTMLElement): void {
		this.sortController.toggleSortList(target);
	}

	public selectSortItem(event: Event): void {
		const target = event.target as HTMLElement;
		const sortType = target.dataset.sort as string;

		const sort = this.sortController.getSort(+sortType);
		this.productController.setCurrentSort(sort);
		this.productController.saveToStorage(sort)
	}

	/* end sort */

	/* filter */

	public toggleFilterList(target: HTMLElement): void {
		//console.log(target);
		this.filterController.toggleFilterList(target);
	}

	public selectValueFilterItem(event: Event): void {
		const target = event.target as HTMLInputElement;
		const filterType = target.dataset.filter as string;

		if (target.checked) {			
			this.addValueFilter(filterType as ValueFilterType);
		} else {
			this.removeValueFilter(filterType as ValueFilterType);
		}
	}

	public addValueFilter(filterType: ValueFilterType): void {		
		const filter = this.filterController.getValueFilter(filterType);
		this.productController.addCurrentValueFilter(filter);
	}

	public removeValueFilter(filterType: ValueFilterType): void {
		this.productController.removeCurrentValueFilter(filterType);
	}

	public addRangeFilter(range: number[], type: string): void {		
		const filter = new RangeFilter(range[0], range[1], type);
		this.productController.addCurrentRangeFilter(filter);
	}

	/* end filter */

	/* search */

	public addSearchFilter(): void {
		const searchInput = document.querySelector('.search__input') as HTMLInputElement;
		const request = searchInput.value;

		if (request) {
			this.productController.addSearchFilter(request);
			const displayedProducts = this.productController.getDisplayedProducts();
			this.searchController.startSearch(request, displayedProducts);
		}
	}

	public clearSearchFilter(): void {
		this.searchController.clearSearch();
		this.productController.addSearchFilter('');
	}	

	/* end search */
}