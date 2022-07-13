import { Sort } from "../../model/sort.model";
import { SortType } from "../../service/sort.service";
import './sort.css';

export class SortView {

	private root: HTMLElement;

	constructor(sorts: Map<SortType, Sort>) {
		const parent = document.getElementById('sort-container') as HTMLElement;

		this.root = this.createElement('ul', 'action__container action-list');

		sorts.forEach((item, key) => {
			const sortItem = this.createElement('li', 'action-list__item');

			const sortRadio = this.createElement('input', 'action-list__input') as HTMLInputElement;
			sortRadio.type = 'radio';
			sortRadio.id = `${item.getField()}-${item.isAsc() ? 'asc' : 'desc'}-sort-input`;
			sortRadio.name = 'sort';
			sortRadio.dataset.sort = key.toString();

			const sortLabel = this.createElement('label', 'action-list__label sort-label') as HTMLLabelElement;
			sortLabel.htmlFor = sortRadio.id;
			sortLabel.textContent = item.getTitle();

			sortItem.append(sortRadio, sortLabel);
			this.root.append(sortItem);
		});

		// const firstRadioElement = this.root.children[0].querySelector(`[type="radio"]`) as HTMLInputElement;
		// firstRadioElement.checked = true;

		parent.append(this.root);
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element
	}

	public toggleSortList(event: Event): void {
		const target = event.target as HTMLElement;
		const sortBtn = target.closest('.sort-btn') as HTMLElement;
		sortBtn.classList.toggle('actions__item_active');

		this.root.classList.toggle('active');
	}

	public initialSort(): void {
		const firstSortItem = document.querySelector(`.action-list__input[data-sort="0"]`) as HTMLInputElement;
		firstSortItem.checked = true;
	}
}