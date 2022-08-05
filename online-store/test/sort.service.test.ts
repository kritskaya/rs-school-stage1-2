import { Sort } from "../src/scripts/model/sort.model";
import { SortService, SortType } from "../src/scripts/service/sort.service";

describe('test getSort method', () => {
  const service = new SortService();

  it ('should return instance of Sort class', () => {
    expect(service.getSort(SortType.AscPrice)).toBeInstanceOf(Sort);
  });

  it ('should return Sort with field "price" for getSort(SortType.AscPrice)', () => {
    expect(service.getSort(SortType.AscPrice)).toHaveProperty('field', 'price');
  });

  it ('should return Sort with field "asc" equal true for getSort(SortType.AscPrice)', () => {
    expect(service.getSort(SortType.AscPrice)).toHaveProperty('asc', true);
  });
});