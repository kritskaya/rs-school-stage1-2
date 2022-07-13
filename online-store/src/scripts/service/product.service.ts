import productsData from '../../assets/json/products.json';
import { Product } from '../model/product.model';
import { Sort } from '../model/sort.model';

export class ProductService {

	private products: Product[];
	private displayedProducts: Product[];

	constructor() {
		this.products = [];

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
			const popular = productsData[i].popular;

			const p = new Product(id, name, price, color, quantity, size, material, keywords, description, image, popular);
			this.products.push(p);
		}

		this.displayedProducts = this.products.slice();
	}

	public getProducts(): Product[] {
		return this.products;
	} 

	public getDisplayedProducts(): Product[] {
		return this.displayedProducts;
	}
	
	public setDisplayedProducts(products: Product[]): void {
		this.displayedProducts = products;
	} 

	public getProduct(id: string): Product {
		return this.products.find((i) => i.getId() === id) as Product;
	}

	public supplySort(sort: Sort): void {
		type Keys = keyof Product;

		this.displayedProducts = this.products.slice();

		this.displayedProducts.sort((item1, item2) => {
			const sortField = sort.getField() as Keys;
			if (!sort.isAsc())
				[item1, item2] = [item2, item1];
				
			if (item1[sortField] > item2[sortField]) {
				return 1;
			}
			if (item1[sortField] < item2[sortField]) {
				return -1;
			}
			
			return 0;
		});
	}
}