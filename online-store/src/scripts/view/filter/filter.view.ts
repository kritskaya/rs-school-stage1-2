import { ValueFilter, ValueFilterType, SizeFilterType } from "../../model/value.filter.model";
import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './filter.css';

export class FilterView {

	constructor(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		this.renderSizeFilter(filters);
		this.renderPriceFilter();
	}

	private renderSizeFilter(filters: Map<ValueFilterType, ValueFilter<ValueFilterType>>) {
		const parent = document.getElementById('size-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list');
		
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

	private renderPriceFilter() {
		const parent = document.getElementById('price-container') as HTMLElement;
		const root = this.createElement('ul', 'action__container action-list range-container');
		
		const filterItem = this.createElement('li', 'action-list__item');
		filterItem.id = 'price-range';
		
		noUiSlider.create(filterItem, {
			start: [5000, 18000],
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

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element
	}

	public toggleFilterList(target: HTMLElement): void {
		const filterBtn = target.closest('.filter-btn') as HTMLElement;
		filterBtn.classList.toggle('actions__item_active');

		const filterList = filterBtn.nextElementSibling as HTMLElement;
		filterList.classList.toggle('active');
	}
}