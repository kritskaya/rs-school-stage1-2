import { Product } from "./product.model";

export class Sort {

	constructor(
		private title: string,
		private field: keyof Product,
		private asc: boolean
	) {}

	public getTitle(): string {
		return this.title;
	}

	public getField(): keyof Product {
		return this.field;
	}

	public isAsc(): boolean {
		return this.asc;
	}
}