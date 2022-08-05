import { FilterService } from "../src/scripts/service/filter.service";
import { ColorFilterType, ValueFilter} from "../src/scripts/model/value.filter.model";

describe('test getValueFilter method', () => {
  const service = new FilterService();

  it ('should return instance of ValueFilter class', () => {
    expect(service.getValueFilter(ColorFilterType.Rose)).toBeInstanceOf(ValueFilter);
  });

  it ('should return ValueFilter with calue "розовый" for getValueFilter(ColorFilterType.Rose)', () => {
    expect(service.getValueFilter(ColorFilterType.Rose)).toHaveProperty('value', ColorFilterType.Rose);
  });

  it ('should return ValueFilter with field "color" for getValueFilter(ColorFilterType.Rose)', () => {
    expect(service.getValueFilter(ColorFilterType.Rose)).toHaveProperty('field', 'color');
  })
});