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

	public toggleSortList(event: Event): void {
		this.view.toggleSortList(event);
	}

	public selectSort(event: Event): void {
		const target = event.target as HTMLElement;
		const sortType = target.dataset.sort as string;

		this.setCurrentSort(+sortType);
	}

	public setCurrentSort(sortType: SortType) {
		this.service.setCurrentSort(sortType);
	}


	public getCurrentSort(): Sort {
		return this.service.getCurrentSort();
	}

}