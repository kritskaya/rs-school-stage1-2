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
		
		this.sortBtnClickHandler();
		this.selectSortItemEventHandler();
		
		/* end sort */	
		
		/* filter */
		
		this.filterBtnClickHandler();
		this.selectFilterValueEventHandler();
		this.priceRangeSetHandler();
		this.quantityRangeSetHandler();
		this.clearFiltersBtnClickHandler();

		/* filter end */

		/* search */

		this.searchBtnClickHandler();
		this.searchKeyDownHandler();
		this.clearSearchBtnHandler();

		/* search end */

		/* order */

		this.cartBtnClickHandler();
		this.toggleProductBtnClickHandler();
		this.clearSettingsBtnClickHandler();

		/* end order */
	}

	private sortBtnClickHandler() {
		document
		.querySelector('.sort-btn')
		?.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			const target = e.target as HTMLElement;

			// close already opened actions
			const opened = document.querySelector<HTMLElement>('.filter-btn.actions__item_active');
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
	}

	private selectSortItemEventHandler() {
		document
		.querySelector<HTMLElement>('.sort-list')
		?.addEventListener('input', (e) => {
			const target = e.target as HTMLElement;
			
			if (target.closest('.action-list__input[type="radio"]')) {
				this.controller.selectSortItem(e);
			}
		});
	}

	private filterBtnClickHandler() {
		document
		.querySelector<HTMLElement>('.actions.section')
		?.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				const target = e.target as HTMLElement;

				if (!target.closest('.filter-btn')) return;

				// close already opened
				const opened = document.querySelector<HTMLElement>('.actions__item_active');
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
			});
	}

	private selectFilterValueEventHandler() {
		document
		.querySelector<HTMLElement>('.actions.section')
		?.addEventListener('input', (e) => {
			const target = e.target as HTMLElement;
			console.log('filter')
			if (target.closest('.action-list__input[type="checkbox"]')) {
				this.controller.selectValueFilterItem(e);
			}
		});
	}

	private priceRangeSetHandler() {
		const priceRange = document.getElementById('price-range') as target;
		priceRange.noUiSlider?.on('set', () => {
			this.controller.addRangeFilter(priceRange.noUiSlider?.get() as number[], 
				RangeFilterType.Price);
		});
	}

	private quantityRangeSetHandler() {
		const quantityRange = document.getElementById('quantity-range') as target;
		quantityRange.noUiSlider?.on('set', () => {
			this.controller.addRangeFilter(quantityRange.noUiSlider?.get() as number[], 
				RangeFilterType.Quantity);
		});
	}

	private clearFiltersBtnClickHandler() {
		document
		.getElementById('clear-filters-btn')
		?.addEventListener('click', () => {
			this.controller.clearAllFilters();
		});
	}

	private searchBtnClickHandler() {
		document
			.querySelector<HTMLElement>('.search__btn_start')
			?.addEventListener('click', () => {
				this.controller.addSearchFilter();
			});
	}

	private searchKeyDownHandler() {
		document
			.querySelector<HTMLElement>('.search__input')
			?.addEventListener('keydown', (e) => {
				const event = e as KeyboardEvent;
				if (event.key === 'Enter') {
					this.controller.addSearchFilter();
				}
			});
	}

	private clearSearchBtnHandler() {
		document
		.querySelector<HTMLElement>('.search__btn_clear')
		?.addEventListener('click', () => {
			this.controller.clearSearchFilter();
		});
	}

	private cartBtnClickHandler() {
		document
			.getElementById('cart-btn')
			?.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				this.controller.toggleOrderList();
				
				this.clickHandler = this.clickOutsideOrderHandler.bind(this);
				
				if (document.querySelector<HTMLElement>('.cart__list')?.classList.contains('active')) {
					document.addEventListener('click', this.clickHandler);
				}
			});
	}

	private toggleProductBtnClickHandler() {
		document
			.querySelector<HTMLElement>('.products__grid')
			?.addEventListener('click', (e) => {
					e.stopImmediatePropagation();
					const target = e.target as HTMLElement;
					if (target.closest('.product__btn')) {
						this.controller.toggleOrderItem(e);
					}
			});
	}

	private clearSettingsBtnClickHandler() {
		document
		.querySelector<HTMLElement>('.header__clear-btn')
		?.addEventListener('click', () => {
			this.controller.clearSettings();
		});
	}

	private clickOutsideOrderHandler(event: Event): void {
		event.stopImmediatePropagation();

		const target = event.target as Element;
	
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
		const btn = document.querySelector<HTMLElement>('.actions__item_active');

		if (!target.closest('.action__container')
			&& !target.closest('.filter-btn')) {
			
			if (btn?.classList.contains('sort-btn')) {
				this.controller.toggleSortList(btn);
			} else if (btn?.classList.contains('filter-btn')) {
				this.controller.toggleFilterList(btn);
			}
			document.removeEventListener('click', this.clickHandler);
		}
	}
}