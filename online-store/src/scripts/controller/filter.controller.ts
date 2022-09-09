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
		return this.service.getValueFilter(type);
	}

	public getRangeFilter(type: RangeFilterType): RangeFilter {
		return this.getRangeFilter(type);
	}

	public clearAllFilters() {
		this.view.clearAllFilters();
	}

	public loadValueFiltersFromStorage(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		const jsonValueFilters = localStorage.getItem('value-filters');
		const loaded =  new Map();

		if (!jsonValueFilters) {
			return loaded;
		}
		
		const filters = JSON.parse(jsonValueFilters);
		filters.forEach((item: ValueFilterPDO) => {
			const title = item.title;
			const field = item.field;
			const value = item.value;
			loaded.set(value, new ValueFilter(title, field, value));

			const input = document.querySelector<HTMLInputElement>(`input[data-filter="${value}"]`);
			
			if (input) {
				input.checked = true;
				this.addActiveValueFilterState(value as ValueFilterType);
			}
		});
				
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

				this.addActiveRangeFilterState(field);
			})
		}
		console.log(loaded);
		return loaded;
	}

	public addActiveValueFilterState(filterType: ValueFilterType): void {
		const filterElement = document.querySelector<HTMLElement>(`[data-filter="${filterType}"]`);
		
		const container = filterElement?.parentElement?.parentElement as HTMLElement;
		if (container) {
			this.view.addActiveValueFilterState(container);
		}
	}

	public removeActiveValueFilterState(filterType: ValueFilterType): void {
		const filterElement = document.querySelector<HTMLElement>(`[data-filter="${filterType}"]`);
		const container = filterElement?.parentElement?.parentElement as HTMLElement;
		if (container) {
			this.view.removeActiveValueFilterState(container);
		}
	}

	public addActiveRangeFilterState(type: RangeFilterType): void {
		const filterElement = document.getElementById(type + "-range");
		const container = filterElement?.parentElement;
		
		if (container) {
			this.view.toggleActiveRangeFilterState(container);
		}
	}
}