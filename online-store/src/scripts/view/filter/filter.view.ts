import { Filter, FilterType, SizeFilterType } from "../../model/filter.model";

export class FilterView {

	constructor(filters: Map<FilterType, Filter<SizeFilterType>>) {
		this.renderSizeFilter(filters);
	}

	private renderSizeFilter(filters: Map<FilterType, Filter<SizeFilterType>>) {
		const parent = document.getElementById('size-container');
		const root = this.createElement('ul', 'action__container action-list');

		filters.forEach((item, key) => {		
			if (key in SizeFilterType) {
				const filterItem = this.createElement('li', 'action-list__item');

				const filterChkbox = this.createElement('input', 'action-list__input') as HTMLInputElement;
				filterChkbox.type = 'checkbox';
				filterChkbox.id = `${item.getField()}-${item.getValue}-filter-input`;
				filterChkbox.dataset.filter = key.toString();
	
				const filterLabel = this.createElement('label', 'action-list__label filter-label') as HTMLLabelElement;
				filterLabel.htmlFor = filterChkbox.id;
				filterLabel.textContent = item.getTitle();
	
				filterItem.append(filterChkbox, filterLabel);
				root.append(filterItem);
			}
		});
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element
	}
}