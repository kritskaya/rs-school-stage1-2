import { Sort } from "../model/sort.model";
import { OrderController } from "./order.controller";
import { ProductController } from "./product.controller";
import { SearchController } from "./search.controller";
import { SortController } from "./sort.controller";

export class AppController {
	private productController: ProductController;
	private orderController: OrderController;
	private sortController: SortController;
	private searchController: SearchController;

	constructor() {
		this.sortController = new SortController();
		this.productController = new ProductController();
		this.orderController = new OrderController();
		this.searchController = new SearchController();

		//this.productController.supplySort(this.sortController.getCurrentSort());

		// const firstSortItem = document.querySelector(`.action-list__input[data-sort="0"]`) as HTMLInputElement;
		// firstSortItem.checked = true;

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

	public toogleOrderItem(event: Event): void {
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

	public toggleSortList(event: Event): void {
		this.sortController.toggleSortList(event);
	}

	public chooseSort(event: Event): void {
		this.sortController.chooseSort(event);
		const sort = this.sortController.getCurrentSort();
		this.productController.supplySort(sort);
	}

	public search(): void {
		const searchInput = document.querySelector('.search__input') as HTMLInputElement;
		const request = searchInput.value;
		console.log(request)

		if (request) {
			const displayedProducts = this.productController.getDisplayedProducts();
			this.searchController.startSearch(request, displayedProducts);
		}
	}
}