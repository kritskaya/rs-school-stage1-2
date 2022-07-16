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

	public toggleFilterList(target: HTMLElement): void {
		this.view.toggleFilterList(target);
	}

	public getValueFilter(type: ValueFilterType): ValueFilter<ValueFilterType> {
		return this.service.getValueFilter(type) as ValueFilter<ValueFilterType>;
	}

	public getRangeFilter(type: RangeFilterType): RangeFilter {
		return this.getRangeFilter(type) as RangeFilter;
	}
}