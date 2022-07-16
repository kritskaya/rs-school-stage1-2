export enum RangeFilterType {
	Price = "price",
	Quantity = "quantity"
}

export class RangeFilter {
	constructor(
		private min: number,
		private max: number,
		private field: string
	) {}
	
	public getMin(): number {
		return this.min;
	}

	public getMax(): number {
		return this.max;
	}

	public getField(): string {
		return this.field;
	}
}