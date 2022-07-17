import { ValueFilter, ValueFilterPDO, ValueFilterType } from "../model/value.filter.model";
import { RangeFilter, RangeFilterPDO, RangeFilterType} from "../model/range.filter.model";
import { FilterService } from "../service/filter.service";
import { FilterView } from "../view/filter/filter.view";
import { target } from "nouislider";

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

	public loadValueFiltersFromStorage(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		const jsonValueFilters = localStorage.getItem('value-filters');
		const loaded =  new Map();

		if (jsonValueFilters) {
			const filters = JSON.parse(jsonValueFilters);
			filters.forEach((item: ValueFilterPDO) => {
				const title = item.title;
				const field = item.field;
				const value = item.value;
				loaded.set(value, new ValueFilter(title, field, value));

				const input = document.querySelector(`input[data-filter=${value}]`) as HTMLInputElement;
				input.checked = true;
			})
		}
		
		return loaded;
	}

	public loadRangeFiltersFromStorage(): Map<RangeFilterType, RangeFilter> {
		const jsonRangeFilters = localStorage.getItem('range-filters');
		const loaded =  new Map();

		if (jsonRangeFilters) {
			const filters = JSON.parse(jsonRangeFilters);
			filters.forEach((item: RangeFilterPDO) => {
				const min = +item.min;
				const max = +item.max;
				const field = item.field;
				loaded.set(field, new RangeFilter(min, max, field));

				const slider = document.getElementById(field + "-range") as target;
				slider.noUiSlider?.set([min, max]);
			})
		}
		console.log(loaded);
		return loaded;
	}
}