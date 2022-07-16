import { ValueFilter, ValueFilterType, SizeFilterType} from "../model/value.filter.model";
import { RangeFilterType, RangeFilter } from "../model/range.filter.model";
import { Product } from "../model/product.model";

export class FilterService {
	private allValueFilters: Map<ValueFilterType, ValueFilter<ValueFilterType>>;
	
	constructor() {
		this.allValueFilters = new Map();
		
		// creating size filters
		this.allValueFilters.set(SizeFilterType.Size60x120, 
			new ValueFilter('60 x 120 см', 'size' as keyof Product, SizeFilterType.Size60x120));
		this.allValueFilters.set(SizeFilterType.Size80x200, 
			new ValueFilter('80 x 200 см', 'size' as keyof Product, SizeFilterType.Size80x200));
		this.allValueFilters.set(SizeFilterType.Size90x200, 
			new ValueFilter('90 x 200 см', 'size' as keyof Product, SizeFilterType.Size90x200));
		this.allValueFilters.set(SizeFilterType.Size160x200, 
			new ValueFilter('160 x 200 см', 'size' as keyof Product, SizeFilterType.Size160x200));
		this.allValueFilters.set(SizeFilterType.Size180x200, 
			new ValueFilter('180 x 200 см', 'size' as keyof Product, SizeFilterType.Size180x200));
	}

	public getAllValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.allValueFilters;
	}

	public getValueFilter(type: ValueFilterType): ValueFilter<ValueFilterType> {
		return this.allValueFilters.get(type) as ValueFilter<ValueFilterType>;
	}
}