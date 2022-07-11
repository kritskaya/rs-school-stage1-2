export class Sort {

	constructor(
		private title: string,
		private field: string,
		private asc: boolean
	) {}

	public getTitle(): string {
		return this.title;
	}

	public getField(): string {
		return this.field;
	}

	public isAsc(): boolean {
		return this.asc;
	}
}