import { Sort } from "../model/sort.model";
import { SizeFilterType, ValueFilter, ValueFilterType } from "../model/value.filter.model";
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
		this.productController = new ProductController();
		this.orderController = new OrderController();
		this.searchController = new SearchController();
		this.filterController = new FilterController();

		if (localStorage.getItem('order')) {
			this.orderController.loadFromStorage();
			this.productController.loadFromStorage();
		}
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
			this.addToOrder(event);
			const isAddBtn = target.closest('.cart-btn') as HTMLElement;
			isAddBtn.classList.add('cart-btn_remove');
		}
	}

	/* sort */

	public toggleSortList(event: Event): void {
		this.sortController.toggleSortList(event);
	}

	public selectSortItem(event: Event): void {
		const target = event.target as HTMLElement;
		const sortType = target.dataset.sort as string;

		const sort = this.sortController.getSort(+sortType);
		this.productController.setCurrentSort(sort);
	}

	public toggleFilterList(event: Event): void {
		this.filterController.toggleFilterList(event);
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

	/* end filter */

	public search(): void {
		const searchInput = document.querySelector('.search__input') as HTMLInputElement;
		const request = searchInput.value;

		if (request) {
			const displayedProducts = this.productController.getDisplayedProducts();
			const searchResult = this.searchController.startSearch(request, displayedProducts);

			this.productController.setDisplayedProducts(searchResult);
			this.productController.displayProducts();
		}
	}

	public clearSearch(): void {
		this.searchController.clearSearch();
		//this.displayProducts();
		//add all filters and sort
	}	
}