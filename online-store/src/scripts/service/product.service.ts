import productsData from '../../assets/json/products.json';
import { Product } from '../model/product.model';
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

		for (const productData of productsData) {
			const id = productData.id;
			const name = productData.name;
			const price = parseInt(productData.price);
			const color = productData.color;
			const quantity = parseInt(productData.quantity);
			const size = productData.size;
			const material = productData.material;
			const keywords = productData.keywords;
			const description = productData.title;
			const image = productData.image;
			const popular = productData.popular;

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
		this.supplyAllConditions();
	}

	public supplySort(): void {
		const sort = this.currentSort;

		this.displayedProducts = this.products.slice();

		this.displayedProducts.sort((item1, item2) => {
			const sortField = sort.getField();
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
		this.supplyAllConditions();
	}

	public removeCurrentValueFilter(filterType: ValueFilterType): void {
		this.currentValueFilters.delete(filterType);
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

	public clearAllFilters() {
		this.currentValueFilters.clear();
		this.currentRangeFilters.clear()

		this.supplyAllConditions();
	}

	public supplyValueFilters(): void {
		type keys = keyof Product;

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
		});

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
		});
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
			});
		}	
	}

	/* end search */	

	public supplyAllConditions() {
		
		this.supplySort();
		this.supplyValueFilters();
		this.supplyRangeFilters();
		this.supplySearchFilter();
	}
	
}