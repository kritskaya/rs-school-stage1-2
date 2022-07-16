import { ValueFilter, ValueFilterType, SizeFilterType, ColorFilterType, MaterialFilterType} from "../model/value.filter.model";
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

		// creating color filters
		this.allValueFilters.set(ColorFilterType.White, 
			new ValueFilter('белый', 'color' as keyof Product, ColorFilterType.White));
		this.allValueFilters.set(ColorFilterType.Beige, 
			new ValueFilter('бежевый', 'color' as keyof Product, ColorFilterType.Beige));
		this.allValueFilters.set(ColorFilterType.Rose, 
			new ValueFilter('розовый', 'color' as keyof Product, ColorFilterType.Rose));
		this.allValueFilters.set(ColorFilterType.Grey, 
			new ValueFilter('серый', 'color' as keyof Product, ColorFilterType.Grey));
		this.allValueFilters.set(ColorFilterType.Brown, 
			new ValueFilter('коричневый', 'color' as keyof Product, ColorFilterType.Brown));
		this.allValueFilters.set(ColorFilterType.Black, 
			new ValueFilter('чёрный', 'color' as keyof Product, ColorFilterType.Black));

		// creating material filters
		this.allValueFilters.set(MaterialFilterType.DSP, 
			new ValueFilter('ДСП', 'material' as keyof Product, MaterialFilterType.DSP));
		this.allValueFilters.set(MaterialFilterType.DVP, 
			new ValueFilter('ДВП', 'material' as keyof Product, MaterialFilterType.DVP));
		this.allValueFilters.set(MaterialFilterType.Steel, 
			new ValueFilter('сталь', 'material' as keyof Product, MaterialFilterType.Steel));
		this.allValueFilters.set(MaterialFilterType.Wood, 
			new ValueFilter('массив дерева', 'material' as keyof Product, MaterialFilterType.Wood));
		this.allValueFilters.set(MaterialFilterType.Veneer, 
			new ValueFilter('шпон', 'material' as keyof Product, MaterialFilterType.Veneer));
	}

	public getAllValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.allValueFilters;
	}

	public getValueFilter(type: ValueFilterType): ValueFilter<ValueFilterType> {
		return this.allValueFilters.get(type) as ValueFilter<ValueFilterType>;
	}
}