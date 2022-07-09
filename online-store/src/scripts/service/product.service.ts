import productsData from '../../assets/json/products.json';
import { Product } from '../model/product.model';

export class ProductService {

	private products: Product[] = [];

	constructor() {
		for (let i = 0; i < productsData.length; i++) {
			const id = productsData[i].id;
			const name = productsData[i].name;
			const price = parseInt(productsData[i].price);
			const color = productsData[i].color;
			const quantity = parseInt(productsData[i].quantity);
			const size = productsData[i].size;
			const material = productsData[i].material;
			const keywords = productsData[i].keywords;
			const description = productsData[i].title;
			const image = productsData[i].image;

			const p = new Product(id, name, price, color, quantity, size, material, keywords, description, image);
			this.products.push(p);
		}
	}

	public getProducts(): Product[] {
		return this.products;
	} 

	public getProduct(id: string) {
		return this.products.find((i) => i.getId() === id);
	}
}