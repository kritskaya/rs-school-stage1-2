import { Product } from "../model/product.model";
import { Sort } from "../model/sort.model";
export enum SortType {
	AscPopular,
	AscPrice,
	DescPrice,
	AscQuantity,
	DescQuantity
}

export class SortService {
	private sorts: Map<SortType, Sort>;

	constructor() {
		this.sorts = new Map();
		
		this.sorts.set(SortType.AscPopular, new Sort('Сначала популярные', 'popular' as keyof Product, true));
		this.sorts.set(SortType.AscPrice, new Sort('Цена: по возрастанию', 'price' as keyof Product, true));
		this.sorts.set(SortType.DescPrice, new Sort('Цена: по убыванию', 'price' as keyof Product, false));
		this.sorts.set(SortType.AscQuantity, new Sort('На складе: по возрастанию', 'quantity' as keyof Product, true));
		this.sorts.set(SortType.DescQuantity, new Sort('На складе: по убыванию', 'quantity' as keyof Product, false));
	}

	public getSort(sortType: SortType): Sort {
		const sort =  this.sorts.get(sortType);
		if (sort) {
			return sort;
		}
		return new Sort('Сначала популярные', 'popular' as keyof Product, true);
	}

	public getSorts(): Map<SortType, Sort> {
		return this.sorts;
	}
}