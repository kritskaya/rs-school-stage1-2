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

	constructor(id: string, name: string, price: number, color: string, quantity: number, size: string, material: string[], keywords: string[], description: string) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.color = color;
		this.quantity = quantity;
		this.material = material;
		this.size = size;
		this.keywords = keywords;
		this.description = description;
	}
}