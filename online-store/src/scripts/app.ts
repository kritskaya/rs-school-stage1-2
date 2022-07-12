import { AppController } from "./controller/app.controller";

export class App {
	private controller: AppController;

	constructor() {
		this.controller = new AppController();
	}

	public start(): void {
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
					this.controller.toogleOrderItem(e);
				})
			);

		document
			.querySelector('.sort-btn')
			?.addEventListener('click', (e) => {
				this.controller.toggleSortList(e);
				e.stopImmediatePropagation();
			});

		document
			.querySelectorAll('.action-list__input')
			.forEach((btn) =>
				btn.addEventListener('input', (e) => {
					this.controller.chooseSort(e);
				})
			);	

		document
			.querySelector('.search__img_submit')
			?.addEventListener('click', () => {
				this.controller.search();
			});

		document
			.querySelector('.search__input')
			?.addEventListener('keydown', (e) => {
				const event = e as KeyboardEvent;
				if (event.key === 'Enter') {
					this.controller.search();
				}
			});
	}
}