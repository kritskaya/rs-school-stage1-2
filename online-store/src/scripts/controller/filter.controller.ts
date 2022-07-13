import { ValueFilter, ValueFilterType } from "../model/value.filter.model";
import { RangeFilter, RangeFilterType} from "../model/range.filter.model";
import { FilterService } from "../service/filter.service";
import { FilterView } from "../view/filter/filter.view";

export class FilterController {
	private service: FilterService;
	private view: FilterView;

	constructor() {
		this.service = new FilterService();
		this.view = new FilterView(this.service.getAllValueFilters());
	}

	public addCurrentValueFilter(filter: ValueFilter<ValueFilterType>): void {
		this.service.addCurrentValueFilter(filter);
	}

	public getCurrentValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.service.getCurrentValueFilters();
	}

	public addCurrentRangeFilter(filter: RangeFilter): void {
		this.service.addCurrentRangeFilter(filter);
	}

	public getCurrentRangeFilters(): Map<RangeFilterType, RangeFilter> {
		return this.service.getCurrentRangeFilters();
	}

	public toggleFilterList(event: Event): void {
		this.view.toggleFilterList(event);
	}
}