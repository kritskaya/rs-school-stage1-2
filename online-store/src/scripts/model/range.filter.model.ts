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

	public setMin(value: number): void {
		this.min = value;
	}

	public setMax(value: number) {
		this.max = value;
	}

	public getField(): string {
		return this.field;
	}
}