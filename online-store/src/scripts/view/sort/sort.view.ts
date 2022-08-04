import { Sort } from "../../model/sort.model";
import { SortType } from "../../service/sort.service";
import { BaseView } from "../BaseView";
import './sort.css';

export class SortView extends BaseView {

	private root: HTMLElement;

	constructor(sorts: Map<SortType, Sort>) {
		super();
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

		parent.append(this.root);
	}

	public toggleSortList(target: HTMLElement): void {
		const sortBtn = target.closest<HTMLElement>('.sort-btn');

		if (sortBtn) {
			sortBtn.classList.toggle('actions__item_active');

			this.root.classList.toggle('active');
		}
	}

	public initialSort(): void {
		const firstSortItem = document.querySelector<HTMLInputElement>(`.action-list__input[data-sort="0"]`);
		
		if (firstSortItem) {
			firstSortItem.checked = true;
		}
	}
}