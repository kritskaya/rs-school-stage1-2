import { AppController } from "./controller/app.controller";

export class App {
	private controller: AppController;

	constructor() {
		this.controller = new AppController();
	}

	public start(): void {

		/* order */

		document
			.getElementById('cart-btn')
			?.addEventListener('click', (e) => {
				this.controller.toggleOrderList();
				e.stopImmediatePropagation();
			});

		document
			.querySelectorAll('.product__btn')
			.forEach((btn) => 
				btn.addEventListener('click', (e) => {
					this.controller.toggleOrderItem(e);
				})
			);
		
		/* end order */

		/* sort */

		document
			.querySelector('.sort-btn')
			?.addEventListener('click', (e) => {
				this.controller.toggleSortList(e);
				e.stopImmediatePropagation();
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
					this.controller.toggleFilterList(e);
				})
			);

		document
			.querySelectorAll('.action-list__input[type="checkbox"]')
			.forEach((btn) =>
				btn.addEventListener('input', (e) => {
					this.controller.selectValueFilterItem(e);
				})
			);

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
	}
}