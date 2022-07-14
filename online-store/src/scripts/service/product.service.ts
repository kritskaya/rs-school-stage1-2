import productsData from '../../assets/json/products.json';
import { Product, ProductPDO } from '../model/product.model';
import { RangeFilter, RangeFilterType } from '../model/range.filter.model';
import { Sort } from '../model/sort.model';
import { ValueFilter, ValueFilterType } from '../model/value.filter.model';
import { SortType } from './sort.service';

export class ProductService {

	private products: Product[];
	private displayedProducts: Product[];

	private currentValueFilters: Map<ValueFilterType, ValueFilter<ValueFilterType>>;
	private currentRangeFilters: Map<RangeFilterType, RangeFilter>;

	private currentSort: Sort;

	constructor() {
		this.products = [];
		this.currentValueFilters = new Map();
		this.currentRangeFilters = new Map();

		//this.currentSort = this.sorts.get(SortType.AscPopular) as Sort;

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

			const p = new Product(id, name, price, color, quantity, size, material, 
				keywords, description, image, popular);

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

	/* sort */

	public getCurrentSort(): Sort {
		return this.currentSort;
	}

	public setCurrentSort(sort: Sort): void {
		this.currentSort = sort;
		this.supplySort();
	}

	public supplySort(): void {
		type Keys = keyof Product;

		const sort = this.currentSort;

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

	/* end sort */

	/* filters */
	public addCurrentValueFilter(filter: ValueFilter<ValueFilterType>): void {
		this.currentValueFilters.set(filter.getValue(), filter);
		this.supplyFilters();
	}

	public removeCurrentValueFilter(filterType: ValueFilterType): void {
		this.currentValueFilters.delete(filterType);
		this.supplyFilters();
	}

	public getCurrentValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.currentValueFilters;
	}

	public addCurrentRangeFilter(filter: RangeFilter): void {
		this.currentRangeFilters.set(filter.getField() as RangeFilterType, filter);
		this.supplyFilters();
	}

	public supplyFilters(): void {
		type keys = keyof Product;

		this.displayedProducts = this.products.slice();

		const sameFilterTypes = new Set();
		const filters = this.currentValueFilters;
		console.log(this.currentValueFilters)

		filters.forEach((item) => sameFilterTypes.add(item.getField()));
		console.log(sameFilterTypes);

		sameFilterTypes.forEach((type) => {
			const values: string[] = [];

			filters.forEach((filter) => {
				if (filter.getField() === type) {
					values.push(filter.getValue())
				}
			})

			console.log(values);
			this.displayedProducts = this.displayedProducts.filter((product) => {
				const productFilterFieldValue = product[type as keys];

				if (typeof productFilterFieldValue === 'string') {
					return values.includes(productFilterFieldValue)
				}
			})
		})

		// filters.forEach((filter, type) => {
		// 	this.displayedProducts = this.displayedProducts.filter((item) => {
		// 		const filterField = filter.getField() as keys;
		// 		const filterValue = filter.getValue();
		// 		const productFieldValue = item[filterField];
		// 		//console.log(item.getId(), productFieldValue);

		// 		if (typeof productFieldValue === 'string') {

		// 			return productFieldValue === filterValue;
		// 		}
				
		// 	})
		// });

		// console.log(this.displayedProducts);
	}

	/* end filters */
	
	public setDisplayedProducts(products: Product[]): void {
		this.displayedProducts = products;
	} 

	public getProduct(id: string): Product {
		return this.products.find((i) => i.getId() === id) as Product;
	}

	
}