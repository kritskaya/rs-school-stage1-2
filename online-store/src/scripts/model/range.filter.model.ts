export enum RangeFilterType {
	Price = "price",
	Quantity = "quantity"
}

export class RangeFilter {
	constructor(
		private min: number,
		private max: number,
		private field: RangeFilterType
	) {}
	
	public getMin(): number {
		return this.min;
	}

	public getMax(): number {
		return this.max;
	}

	public getField(): RangeFilterType {
		return this.field;
	}
}

export type RangeFilterPDO = {
	min: string;
	max: string;
	field: RangeFilterType;
}