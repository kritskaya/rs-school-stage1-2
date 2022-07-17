import productsData from '../../assets/json/products.json';
import { Product, ProductPDO } from '../model/product.model';
import { RangeFilter, RangeFilterType } from '../model/range.filter.model';
import { Search } from '../model/search.model';
import { Sort } from '../model/sort.model';
import { ValueFilter, ValueFilterType } from '../model/value.filter.model';

export class ProductService {

	private products: Product[];
	private displayedProducts: Product[];

	private currentValueFilters: Map<ValueFilterType, ValueFilter<ValueFilterType>>;
	private currentRangeFilters: Map<RangeFilterType, RangeFilter>;

	private currentSort: Sort;
	private currentSearch: Search;

	constructor() {
		this.products = [];
		this.currentValueFilters = new Map();

		this.currentRangeFilters = new Map();
		this.currentRangeFilters.set(RangeFilterType.Price, new RangeFilter(0, 50000, 'price'));
		this.currentRangeFilters.set(RangeFilterType.Quantity, new RangeFilter(0, 50, 'quantity'));
		
		this.currentSearch = new Search('');

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

	public getProduct(id: string): Product {
		return this.products.find((i) => i.getId() === id) as Product;
	}

	public getDisplayedProducts(): Product[] {
		return this.displayedProducts;
	}

	public setDisplayedProducts(products: Product[]): void {
		this.displayedProducts = products;
	}

	/* sort */

	public getCurrentSort(): Sort {
		return this.currentSort;
	}

	public setCurrentSort(sort: Sort): void {
		this.currentSort = sort;
		//this.supplySort();
		this.supplyAllConditions();
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
		//this.supplyValueFilters();
		this.supplyAllConditions();
	}

	public removeCurrentValueFilter(filterType: ValueFilterType): void {
		this.currentValueFilters.delete(filterType);
		//this.supplyValueFilters();
		this.supplyAllConditions();
	}

	public getCurrentValueFilters(): Map<ValueFilterType, ValueFilter<ValueFilterType>> {
		return this.currentValueFilters;
	}

	public setCurrentFilters(valueFilters: Map<ValueFilterType, ValueFilter<ValueFilterType>>, 
		rangeFilters: Map<RangeFilterType, RangeFilter>): void {
		this.currentValueFilters = valueFilters;
		this.currentRangeFilters = rangeFilters;

		this.supplyAllConditions();
	}

	public addCurrentRangeFilter(filter: RangeFilter): void {
		this.currentRangeFilters.set(filter.getField() as RangeFilterType, filter);

		this.supplyAllConditions();
	}

	public getCurrentRangeFilters(): Map<RangeFilterType, RangeFilter> {
		return this.currentRangeFilters;
	}

	public supplyValueFilters(): void {
		type keys = keyof Product;

		//this.displayedProducts = this.products.slice();

		const sameFilterTypes = new Set();
		const filters = this.currentValueFilters;

		filters.forEach((item) => sameFilterTypes.add(item.getField()));

		sameFilterTypes.forEach((type) => {
			const values: string[] = [];

			filters.forEach((filter) => {
				if (filter.getField() === type) {
					values.push(filter.getValue())
				}
			})

			this.displayedProducts = this.displayedProducts.filter((product) => {
				const productFilterFieldValue = product[type as keys];

				if (typeof productFilterFieldValue === 'string') {
					return values.includes(productFilterFieldValue)
				} else if (Array.isArray(productFilterFieldValue)) {
					
					const arrayItem = productFilterFieldValue.find((item) => {
						return values.includes(item);
					});
					
					return arrayItem ? true: false;
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

	public supplyRangeFilters(): void {
		type keys = keyof Product;

		const filters = this.currentRangeFilters;

		filters.forEach((filter) => {
			this.displayedProducts = this.displayedProducts.filter((product) => {
				const fieldName = filter.getField() as keys;
				const maxValue = filter.getMax();
				const minValue = filter.getMin();

				if (+product[fieldName] <= maxValue && +product[fieldName] >= minValue) {
					return product;
				}
			})
		})

	}

	/* end filters */
	
	/* search */
	
	public setCurrentSearch(search: Search): void {
		this.currentSearch = search;
		this.supplyAllConditions();
	}

	public getCurrentSearch(): Search {
		return this.currentSearch;
	}

	public clearSearchFilter() {
		this.currentSearch = new Search('');
		this.supplyAllConditions();
	}

	public supplySearchFilter() {

		const products = this.displayedProducts;

		if (this.currentSearch.getRequest()) {
			this.displayedProducts = products.filter((item) => {
				const request = this.currentSearch.getRequest().toLowerCase();

				const nameResult = item.getName().indexOf(request);
				const titleRequest = item.getDescription().indexOf(request);
				const color = item.getColor().indexOf(request);
				const material = item.getMaterial().findIndex((m) => m.indexOf(request) > -1);

				return nameResult >= 0 || titleRequest >= 0 || color >= 0 || material >= 0;
			})
		}	
	}

	/* end search */	

	public supplyAllConditions() {
		
		this.supplySort();
		this.supplyValueFilters();
		this.supplyRangeFilters();
		this.supplySearchFilter();

		this.saveToLocalStorage();
	}

	private saveToLocalStorage() {
		//console.log(this.currentSearch);
		// localStorage.setItem('sort', JSON.stringify(this.currentSort));
		// localStorage.setItem('search', JSON.stringify(this.currentSearch.getRequest()));
		// localStorage.setItem('range-filters', JSON.stringify(this.currentRangeFilters));
		// localStorage.setItem('value-filters', JSON.stringify(this.currentRangeFilters));
	}
	
}