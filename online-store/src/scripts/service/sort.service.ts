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
	private currentSort: Sort;

	constructor() {
		this.sorts = new Map();
		
		this.sorts.set(SortType.AscPopular, new Sort('Сначала популярные', 'popular' as keyof Product, true));
		this.sorts.set(SortType.AscPrice, new Sort('Цена: по возрастанию', 'price' as keyof Product, true));
		this.sorts.set(SortType.DescPrice, new Sort('Цена: по убыванию', 'price' as keyof Product, false));
		this.sorts.set(SortType.AscQuantity, new Sort('На складе: по возрастанию', 'quantity' as keyof Product, true));
		this.sorts.set(SortType.DescQuantity, new Sort('На складе: по убыванию', 'quantity' as keyof Product, false));

		this.currentSort = this.sorts.get(SortType.AscPopular) as Sort;
	}

	public getCurrentSort(): Sort {
		return this.currentSort;
	}

	public setCurrentSort(sortType: SortType): void {
		this.currentSort = this.sorts.get(sortType) as Sort;
	}

	public getSorts(): Map<SortType, Sort> {
		return this.sorts;
	}
}