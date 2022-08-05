import { ColorFilterType, MaterialFilterType, SizeFilterType } from "../src/scripts/model/value.filter.model";
import { RangeFilter } from "../src/scripts/model/range.filter.model";
import { FilterService } from "../src/scripts/service/filter.service";
import { ProductService } from "../src/scripts/service/product.service";
import { SortService, SortType } from "../src/scripts/service/sort.service";
import { Search } from "../src/scripts/model/search.model";

describe('test setCurrentSort method', () => {
  const service = new ProductService();
  const sortService = new SortService();
  let sort;
  
  it ('should set on the first place the item with minimum price for sort by price in asc order', () => {
    sort = sortService.getSort(SortType.AscPrice);
    service.setCurrentSort(sort);
    const minPrice = Math.min(...service.getProducts().map((item) => item.getPrice()));
    expect(service.getDisplayedProducts()[0].getPrice()).toBe(minPrice);
  });

  it ('should set on the last place the item with maximum price for sort by price in asc order', () => {
    const maxPrice = Math.max(...service.getProducts().map((item) => item.getPrice()));
    const products = service.getDisplayedProducts();
    expect(products[products.length - 1].getPrice()).toBe(maxPrice);
  });

  it ('should set on the first place the item with maximum quantity for sort by quantity in desc order', () => {
    sort = sortService.getSort(SortType.DescQuantity);
    service.setCurrentSort(sort);
    const maxQuantity = Math.max(...service.getProducts().map((item) => item.getQuantity()));
    expect(service.getDisplayedProducts()[0].getQuantity()).toBe(maxQuantity);
  });

  it ('should set on the last place the item with minimum quantity for sort by quantity in desc order', () => {
    const minQuantity = Math.min(...service.getProducts().map((item) => item.getQuantity()));
    const products = service.getDisplayedProducts();
    expect(products[products.length - 1].getQuantity()).toBe(minQuantity);
  });
});

describe('test addCurrentValueFilter method', () => {
  const service = new ProductService();
  const sortService = new SortService();
  const sort = sortService.getSort(SortType.AscPopular);
  service.setCurrentSort(sort);
  const filterService = new FilterService();
  let filter;

  it ('should filter 2 items for size 60x120', () => {
    filter = filterService.getValueFilter(SizeFilterType.Size60x120);
    service.addCurrentValueFilter(filter);

    const products = service.getProducts().filter((item) => item.getSize() === '60x120');
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });

  it ('should filter 1 item for color "розовый"', () => {
    filter = filterService.getValueFilter(ColorFilterType.Rose);
    service.clearAllFilters();
    service.addCurrentValueFilter(filter);

    const products = service.getProducts().filter((item) => item.getColor() === 'розовый');
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });

  it ('combine filters from the same group, should return 5 items for size 60x120 and 90x200', () => {
    service.clearAllFilters();

    filter = filterService.getValueFilter(SizeFilterType.Size60x120);
    service.addCurrentValueFilter(filter);
    filter = filterService.getValueFilter(SizeFilterType.Size90x200);
    service.addCurrentValueFilter(filter);

    const products = service.getProducts().filter((item) => 
      (item.getSize() === '60x120' || item.getSize() === '90x200'));
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });

  it ('combine filters from the different groups, should return 1 item1 for size 60x120 and color "серый"', () => {
    service.clearAllFilters();

    filter = filterService.getValueFilter(SizeFilterType.Size60x120);
    service.addCurrentValueFilter(filter);
    filter = filterService.getValueFilter(ColorFilterType.Grey);
    service.addCurrentValueFilter(filter);

    const products = service.getProducts().filter((item) => 
      (item.getSize() === '60x120' && item.getColor() === 'серый'));
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });
});

describe('test addCurrentRangeFilter method', () => {
  const service = new ProductService();
  const sortService = new SortService();
  const sort = sortService.getSort(SortType.AscPopular);
  service.setCurrentSort(sort);

  it ('should filter 3 items for price = [0; 10000]', () => {
    const min = 0;
    const max = 10000;
    service.addCurrentRangeFilter(new RangeFilter(min, max, 'price'));

    const products = service.getProducts().filter((item) => item.getPrice() <= max);
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });

  it ('should filter 5 items for quantity = [10; 15]', () => {
    service.clearAllFilters();
    const min = 10;
    const max = 15;
    service.addCurrentRangeFilter(new RangeFilter(min, max, 'quantity'));

    const products = service.getProducts().filter((item) => 
      ((item.getQuantity() <= max) && (item.getQuantity() >= min)));
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });

  it ('combine 2 range filters: should return 3 items for price = [0, 30000] and for quantity = [10; 15]', () => {
    service.clearAllFilters();

    const minQuantity = 10;
    const maxQuantity = 15;
    service.addCurrentRangeFilter(new RangeFilter(minQuantity, maxQuantity, 'quantity'));

    const minPrice = 0;
    const maxPrice = 30000;
    service.addCurrentRangeFilter(new RangeFilter(minPrice, maxPrice, 'price'));

    const products = service.getProducts().filter((item) => 
      (item.getQuantity() <= maxQuantity && item.getQuantity() >= minQuantity
        && item.getPrice() <= maxPrice && item.getPrice() >= minPrice));
    expect(service.getDisplayedProducts()).toMatchObject(products);
  });
});

describe('test setCurrentSearch method', () => {
  const service = new ProductService();
  const sortService = new SortService();
  const sort = sortService.getSort(SortType.AscPopular);
  service.setCurrentSort(sort);

  it ('should return 1 item for search word "диван"', () => {
    const request = 'диван';
    service.setCurrentSearch(new Search(request));

    const products = service.getProducts().filter((item) => {
      const nameResult = item.getName().indexOf(request);
      const titleRequest = item.getDescription().indexOf(request);
      const color = item.getColor().indexOf(request);
      const material = item.getMaterial().findIndex((m) => m.indexOf(request) > -1);
      return nameResult >= 0 || titleRequest >= 0 || color >= 0 || material >= 0;
    });

    expect(service.getDisplayedProducts()).toMatchObject(products);
  });
});

describe('test combine sort, filter and search method', () => {
  const service = new ProductService();
  const sortService = new SortService();
  const filterService = new FilterService();
  const sort = sortService.getSort(SortType.DescPrice);
  service.setCurrentSort(sort);

  it (`should return 1 item for search word "кровати,"
      sort by price an des order
      filter by color "белый"
      filter by size 160x200
      filter by material "масcив дерева"
      filter by quantity = [0; 20]"`, () => {

    let filter = filterService.getValueFilter(SizeFilterType.Size160x200);
    service.addCurrentValueFilter(filter);
    filter = filterService.getValueFilter(ColorFilterType.White);
    service.addCurrentValueFilter(filter);
    filter = filterService.getValueFilter(MaterialFilterType.Wood)
    service.addCurrentValueFilter(filter);

    let products = service.getDisplayedProducts().filter((item) => 
      (item.getSize() === '160x200' && item.getColor() === 'белый') && item.getMaterial().includes('масcив дерева'));

    const min = 0;
    const max = 20;
    service.addCurrentRangeFilter(new RangeFilter(min, max, 'quantity'));

    products = service.getDisplayedProducts().filter((item) => 
      (item.getQuantity() <= max && item.getQuantity() >= min));

    const request = 'кровати';
    service.setCurrentSearch(new Search(request));

    products = service.getDisplayedProducts().filter((item) => {
      const nameResult = item.getName().indexOf(request);
      const titleRequest = item.getDescription().indexOf(request);
      const color = item.getColor().indexOf(request);
      const material = item.getMaterial().findIndex((m) => m.indexOf(request) > -1);
      return nameResult >= 0 || titleRequest >= 0 || color >= 0 || material >= 0;
    });

    expect(service.getDisplayedProducts()).toMatchObject(products);
  });
});