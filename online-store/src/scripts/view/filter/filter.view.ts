import { ValueFilter, ValueFilterType, SizeFilterType, ColorFilterType, MaterialFilterType } from "../../model/value.filter.model";
import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './filter.css';
import { BaseView } from "../BaseView";

export class FilterView extends BaseView {

	constructor(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		super();
		this.renderSizeFilter(filters);
		this.renderPriceFilter();
		this.renderColorFilter(filters);
		this.renderMaterialFilter(filters);
		this.renderQuantityFilter();
	}

	private renderSizeFilter(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		const parent = document.getElementById('size-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list filter-list');
		
		filters.forEach((item, key) => {	
			const keyInType = (Object.values(SizeFilterType) as string[]).includes(key);	
			if (keyInType) {
				const filterItem = this.createElement('li', 'action-list__item');

				const filterChkbox = this.createElement('input', 'action-list__input') as HTMLInputElement;
				filterChkbox.type = 'checkbox';
				filterChkbox.id = `${item.getField()}-${item.getValue()}-filter-input`;
				filterChkbox.dataset.filter = key.toString();
	
				const filterLabel = this.createElement('label', 'action-list__label filter-label') as HTMLLabelElement;
				filterLabel.htmlFor = filterChkbox.id;
				filterLabel.textContent = item.getTitle();
	
				filterItem.append(filterChkbox, filterLabel);
				root.append(filterItem);
			}
		});

		parent.append(root);
	}

	private renderColorFilter(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		const parent = document.getElementById('color-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list filter-list');
		const colors = ['#ffffff', '#ffcc99', '#ff99cc', '#666666', '#663300', '#000000'];
		let start = 0;
		
		filters.forEach((item, key) => {	
			const keyInType = (Object.values(ColorFilterType) as string[]).includes(key);	
			if (keyInType) {
				const filterItem = this.createElement('li', 'action-list__item');

				const colorElement = this.createElement('div', 'action-list__color');
				colorElement.style.backgroundColor = colors[start++];

				const filterChkbox = this.createElement('input', 'action-list__input') as HTMLInputElement;
				filterChkbox.type = 'checkbox';
				filterChkbox.id = `${item.getField()}-${item.getValue()}-filter-input`;
				filterChkbox.dataset.filter = key.toString();
	
				const filterLabel = this.createElement('label', 'action-list__label filter-label') as HTMLLabelElement;
				filterLabel.htmlFor = filterChkbox.id;
				filterLabel.textContent = item.getTitle();
	
				filterItem.append(colorElement, filterChkbox, filterLabel);
				root.append(filterItem);
			}
		});

		parent.append(root);
	}

	private renderMaterialFilter(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		const parent = document.getElementById('material-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list filter-list');
		
		filters.forEach((item, key) => {	
			const keyInType = (Object.values(MaterialFilterType) as string[]).includes(key);	
			if (keyInType) {
				const filterItem = this.createElement('li', 'action-list__item');

				const filterChkbox = this.createElement('input', 'action-list__input') as HTMLInputElement;
				filterChkbox.type = 'checkbox';
				filterChkbox.id = `${item.getField()}-${item.getValue()}-filter-input`;
				filterChkbox.dataset.filter = key.toString();
	
				const filterLabel = this.createElement('label', 'action-list__label filter-label') as HTMLLabelElement;
				filterLabel.htmlFor = filterChkbox.id;
				filterLabel.textContent = item.getTitle();
	
				filterItem.append(filterChkbox, filterLabel);
				root.append(filterItem);
			}
		});

		parent.append(root);
	}

	private renderPriceFilter() {
		const parent = document.getElementById('price-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list range-container');
		
		const filterItem = this.createElement('li', 'action-list__item');
		filterItem.id = 'price-range';
		
		noUiSlider.create(filterItem, {
			start: [0, 50000],
			connect: true,
			step: 100,
			format: {
				to: function (value) {
					return +(+value).toFixed(0);
				},
				from: function (value) {
					return +(+value).toFixed(0);
				}
			},
				tooltips: [true, true],
			range: {
				'min': 0,
				'max': 50000,
			}
		});
		
		root.append(filterItem);
		parent.append(root);
	}

	private renderQuantityFilter() {
		const parent = document.getElementById('quantity-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list range-container');
		
		const filterItem = this.createElement('li', 'action-list__item');
		filterItem.id = 'quantity-range';
		
		noUiSlider.create(filterItem, {
			start: [0, 50],
			connect: true,
			step: 1,
			format: {
				to: function (value) {
					return +(+value).toFixed(0);
				},
				from: function (value) {
					return +(+value).toFixed(0);
				}
			},
			tooltips: [true, true],
			range: {
				'min': 0,
				'max': 50,
			}
		});
		
		root.append(filterItem);
		parent.append(root);
	}

	public clearAllFilters() {
		const allCheckboxes = document.querySelectorAll<HTMLInputElement>(`.action-list__input[type="checkbox"]`);
		allCheckboxes.forEach((checkbox) => {
			checkbox.checked = false;
		});

		const allRangeContainers = document.querySelectorAll<HTMLElement>(`.range-container`);
		allRangeContainers.forEach((container) => {
			const rangeSlider = container.firstElementChild as target;
			if (rangeSlider.noUiSlider) {
				const starts = rangeSlider.noUiSlider.options.start as number[];
				const [min, max] = starts;
				rangeSlider.noUiSlider.set([min, max]);
			}
		});	
		
		const btns = document.querySelectorAll('.filter-btn');
		btns.forEach((btn) => {
			btn.classList.remove('filter-btn_active');
		})
	}

	public toggleFilterList(target: HTMLElement): void {
		const filterBtn = target.closest<HTMLElement>('.filter-btn');
		filterBtn?.classList.toggle('actions__item_active');

		if (filterBtn) {
			const filterList = filterBtn.nextElementSibling as HTMLElement;
			filterList.classList.toggle('active');
		}
	}

	public addActiveValueFilterState(container: HTMLElement): void {
		const checked = container.querySelectorAll<HTMLElement>('input:checked');

		if (checked.length) {
			const btn = container.previousElementSibling as HTMLElement;
			btn.classList.add('filter-btn_active');
		}
	}

	public removeActiveValueFilterState(container: HTMLElement): void {
		const checked = container.querySelectorAll<HTMLElement>('input:checked');

		if (!checked.length) {
			const btn = container.previousElementSibling as HTMLElement;
			btn.classList.remove('filter-btn_active');
		}
	}

	public toggleActiveRangeFilterState(container: HTMLElement): void {
		const rangeSlider = container.querySelector<target>('.noUi-target');
		
		if (rangeSlider?.noUiSlider) {
			const starts = rangeSlider.noUiSlider.options.start as number[];
			const [min, max] = starts;
			const [start, end] = rangeSlider.noUiSlider.get() as number[];
			const btn = container.previousElementSibling as HTMLElement;

			if (start !== min || end !== max) {
				btn.classList.add('filter-btn_active');
			} else {
				btn.classList.remove('filter-btn_active');
			}
		}
	}
}