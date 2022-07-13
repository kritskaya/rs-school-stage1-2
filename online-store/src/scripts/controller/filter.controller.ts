import { Filter, FilterType } from "../model/filter.model";
import { FilterService } from "../service/filter.service";
import { FilterView } from "../view/filter/filter.view";

export class FilterController {
	private service: FilterService;
	private view: FilterView;

	constructor() {
		this.service = new FilterService();
		this.view = new FilterView(this.service.getAllFilters());
	}

	public addCurrentFilter(filter: Filter<FilterType>): void {
		this.service.addCurrentFilter(filter);
	}

	public getCurrentFilters(): Map<FilterType, Filter<FilterType>> {
		return this.service.getCurrentFilters();
	}
}