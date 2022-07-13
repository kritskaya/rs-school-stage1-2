import { Filter, FilterType, SizeFilterType } from "../model/filter.model";
import { Product } from "../model/product.model";

export class FilterService {
	private allFilters: Map<FilterType, Filter<FilterType>>;
	private currentFilters: Map<FilterType, Filter<FilterType>>;

	constructor() {
		this.allFilters = new Map();
		this.currentFilters = new Map();

		// creating size filters
		this.allFilters.set(SizeFilterType.Size60x120, 
			new Filter('60 x 120 см', 'size' as keyof Product, SizeFilterType.Size60x120));
		this.allFilters.set(SizeFilterType.Size80x200, 
			new Filter('80 x 200 см', 'size' as keyof Product, SizeFilterType.Size80x200));
		this.allFilters.set(SizeFilterType.Size90x200, 
			new Filter('90 x 200 см', 'size' as keyof Product, SizeFilterType.Size90x200));
		this.allFilters.set(SizeFilterType.Size160x200, 
			new Filter('160 x 200 см', 'size' as keyof Product, SizeFilterType.Size160x200));
		this.allFilters.set(SizeFilterType.Size180x200, 
			new Filter('180 x 200 см', 'size' as keyof Product, SizeFilterType.Size180x200));
	}

	public getAllFilters(): Map<FilterType, Filter<FilterType>> {
		return this.allFilters;
	}

	public addCurrentFilter(filter: Filter<FilterType>): void {
		this.currentFilters.set(filter.getValue(), filter);
	}

	public getCurrentFilters(): Map<FilterType, Filter<FilterType>> {
		return this.currentFilters;
	}
}