export type ProductPDO = {
	id: string;
	name: string;
	size: string;
	color: string;
	price: string;
	quantity: string;
	material: string[];
	keywords: string[];
	title: string;
	image: string;
	popular: string;
}

export class Product {

	private id: string;
	private name: string;
	private size: string;
	private color: string;
	private price: number;
	private quantity: number;
	private material: string[];
	private keywords: string[];
	private description: string;
	private image: string;
	private popular: string;

	constructor(id: string, name: string, price: number, color: string, quantity: number, size: string, material: string[], keywords: string[], description: string, image: string, popular: string) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.color = color;
		this.quantity = quantity;
		this.material = material;
		this.size = size;
		this.keywords = keywords;
		this.description = description;
		this.image = image;
		this.popular = popular;
	}

	public getId():string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getPrice(): number {
		return this.price;
	}

	public getColor(): string {
		return this.color;
	}

	public getQuantity(): number {
		return this.quantity;
	}

	public getMaterial(): string[] {
		return this.material;
	}

	public getSize(): string {
		return this.size;
	}

	public getKeywords(): string[] {
		return this.keywords;
	}

	public getDescription(): string {
		return this.description;
	}

	public getImage(): string {
		return this.image;
	}

	public getPopular(): string {
		return this.popular;
	}
}