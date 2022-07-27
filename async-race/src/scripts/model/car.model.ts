export class Car {
	constructor (
		private id: number,
		private name: string,
		private color: string
	) {}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getColor(): string {
		return this.color;
	}

	public setColor(color: string): void {
		this.color = color;
	}
}