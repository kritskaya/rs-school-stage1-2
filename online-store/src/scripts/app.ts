import { target } from "nouislider";
import { AppController } from "./controller/app.controller";
import { RangeFilterType } from "./model/range.filter.model";

export class App {
	private controller: AppController;
	private clickHandler: EventListener;

	constructor() {
		this.controller = new AppController();
	}

	public start(): void {

		/* sort */

		document
			.querySelector('.sort-btn')
			?.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				const target = e.target as HTMLElement

				// close already opened
				const opened = document.querySelector('.filter-btn.actions__item_active') as HTMLElement;
				if (opened) {
					this.controller.toggleFilterList(opened);
				}
				
				this.controller.toggleSortList(target);
				
				this.clickHandler = this.clickOutsideActionHandler.bind(this);

				const listElement = target.nextElementSibling as HTMLElement;
				if (listElement.classList.contains('active')) {
					document.addEventListener('click', this.clickHandler);
				}
			});

		document
			.querySelectorAll('.action-list__input[type="radio"]')
			.forEach((btn) =>
				btn.addEventListener('input', (e) => {
					this.controller.selectSortItem(e);
				})
			);	
		
		/* end sort */	
		
		/* filter */

		document
			.querySelectorAll('.filter-btn')
			.forEach((btn) =>
				btn.addEventListener('click', (e) => {
					e.stopImmediatePropagation();
					const target = e.target as HTMLElement;

					// close already opened
					const opened = document.querySelector('.actions__item_active') as HTMLElement;
					const current = target.closest('.filter-btn');
					
					if (opened && opened !== current) {
						if (opened.classList.contains('sort-btn')) {
							this.controller.toggleSortList(opened);
						} else {
							this.controller.toggleFilterList(opened);
						}
					}
					
					this.controller.toggleFilterList(target);
					
					this.clickHandler = this.clickOutsideActionHandler.bind(this);

					const listElement = target.nextElementSibling as HTMLElement;

					if (listElement.classList.contains('active')) {
						document.addEventListener('click', this.clickHandler);
					}
				})
			);

		document
			.querySelectorAll('.action-list__input[type="checkbox"]')
			.forEach((btn) =>
				btn.addEventListener('input', (e) => {
					this.controller.selectValueFilterItem(e);
				})
			);

		const priceRange = document.getElementById('price-range') as target;
		priceRange.noUiSlider?.on('set', () => {
			this.controller.addRangeFilter(priceRange.noUiSlider?.get() as number[], 
				RangeFilterType.Price);
		});

		const quantityRange = document.getElementById('quantity-range') as target;
		quantityRange.noUiSlider?.on('set', () => {
			this.controller.addRangeFilter(quantityRange.noUiSlider?.get() as number[], 
				RangeFilterType.Quantity);
		});

		document
			.getElementById('clear-filters-btn')
			?.addEventListener('click', () => {
				this.controller.clearAllFilters();
			});

		/* filter end */

		/* search */

		document
			.querySelector('.search__btn_start')
			?.addEventListener('click', () => {
				this.controller.addSearchFilter();
			});

		document
			.querySelector('.search__input')
			?.addEventListener('keydown', (e) => {
				const event = e as KeyboardEvent;
				if (event.key === 'Enter') {
					this.controller.addSearchFilter();
				}
			});

		document
			.querySelector('.search__btn_clear')
			?.addEventListener('click', () => {
				this.controller.clearSearchFilter();
			});

		/* search end */

		/* order */

		document
			.getElementById('cart-btn')
			?.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				this.controller.toggleOrderList();
				

				this.clickHandler = this.clickOutsideOrderHandler.bind(this);
				// this.clickHandler = this.clickOutsideOrderHandler.bind(this, e, ['cart__list2', 'cart__btn', 'product__btn', 'cart-item__remove-btn'], () => this.controller.toggleOrderList());

				if (document.querySelector('.cart__list')?.classList.contains('active')) {
					document.addEventListener('click', this.clickHandler);
				}
			});

		document
			.querySelectorAll('.product__btn')
			.forEach((btn) =>
				btn.addEventListener('click', (e) => {
					e.stopImmediatePropagation();
					this.controller.toggleOrderItem(e);
				})
			);

		document
			.querySelector('.header__clear-btn')
			?.addEventListener('click', (e) => {
				this.controller.clearSettings();
			});

		/* end order */
	}

	// private clickOutsideOrderHandler(event: Event, classes: string[],  callback: () => void): void {
	private clickOutsideOrderHandler(event: Event): void {
		event.stopImmediatePropagation();

		const target = event.target as Element;
	
		// const rightElement = classes.find(className => {
		// 	target.closest(`.${className}`) !== null;
		// });
		
		// if(!rightElement) {
		// 	callback();
		// 	document.removeEventListener('click', this.clickHandler);
		// }

		if (!target.closest('.cart__list') && 
			!target.closest('.cart__btn') &&
			!target.closest('.product__btn') &&
			!target.closest('.cart-item__remove-btn')) {
			this.controller.toggleOrderList();
			document.removeEventListener('click', this.clickHandler);
		}
	}

	private clickOutsideActionHandler(event: Event): void {
		event.stopImmediatePropagation();
		
		const target = event.target as HTMLElement;
		const btn = document.querySelector('.actions__item_active') as HTMLElement;

		if (!target.closest('.action__container')
			&& !target.closest('.filter-btn')) {
			
			if (btn.classList.contains('sort-btn')) {
				this.controller.toggleSortList(btn);
			} else if (btn.classList.contains('filter-btn')) {
				this.controller.toggleFilterList(btn);
			}
			document.removeEventListener('click', this.clickHandler);
		}
	}
}