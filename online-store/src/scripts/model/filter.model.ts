export enum SizeFilterType {
	Size60x120 = "60x120",
	Size80x200 = "80x200",
	Size90x120 = "90x200",
	Size160x200 = "160x200",
	Size180x120 = "200x200",
}

export enum MaterialFilterType {
	DSP = "ДСП",
	DVP = "ДВП",
	Steel = "сталь",
	Wood = "массив дерева",
	Veneer = "шпон"
}

export type FilterType = SizeFilterType | MaterialFilterType;

export class Filter<T> {
	constructor(
		private title: string,
		private field: string,
		private value: T
	) {}

	public getTitle(): string {
		return this.title;
	}

	public getField(): string {
		return this.field;
	}

	public getValue(): T {
		return this.value;
	}
}