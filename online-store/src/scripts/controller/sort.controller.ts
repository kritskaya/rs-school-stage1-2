import { Sort } from "../model/sort.model";
import { SortService, SortType } from "../service/sort.service";
import { SortView } from "../view/sort/sort.view";

export class SortController {
	private service: SortService;
	private view: SortView;

	constructor() {
		this.service = new SortService();
		this.view = new SortView(this.service.getSorts());
		this.view.initialSort();
	}

	public toggleSortList(target: HTMLElement): void {
		this.view.toggleSortList(target);
	}

	public getSort(sortType: SortType): Sort {
		return this.service.getSort(sortType);
	}

	public loadFromStorage() {
		const jsonSort = localStorage.getItem('sort');

		if (jsonSort) {
			const sort = JSON.parse(jsonSort);
			
			document.querySelectorAll<HTMLElement>(`.sort-label`)
				.forEach((label) => {
					if (label.textContent === sort.title) {
						const input = label.previousElementSibling;
						
						if (input) {
							(input as HTMLInputElement).checked = true;
						}
					}
				})
		}
	}
}