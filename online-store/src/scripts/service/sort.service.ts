import { Sort } from "../model/sort.model";
export enum SortType {
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
		
		this.sorts.set(SortType.AscPrice, new Sort('Цена: по возрастанию', 'price', true));
		this.sorts.set(SortType.DescPrice, new Sort('Цена: по убыванию', 'price', false));
		this.sorts.set(SortType.AscQuantity, new Sort('На складе: по возрастанию', 'quantity', true));
		this.sorts.set(SortType.DescQuantity, new Sort('На складе: по убыванию', 'quantity', false));
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