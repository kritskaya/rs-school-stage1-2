export interface ICar {
	id: number;
	name: string;
	color: string;
}

export class Car {
	private id: number;
	private name: string;
	private color: string;

	constructor (id: number, name: string, color: string) {
		this.id = id;
		this.name = name;
		this.color = color;
	}

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