import { OrderService } from "../src/scripts/service/order.service";

describe('test addProduct method', () => {
  const service = new OrderService();
  const count = service.getOrder().getProducts().length;
  service.addProduct('09406519');

  it('add one new item to order', () => {
    expect(service.getOrder().getProducts().length - count).toBe(1);
  });

  it('new item with id 09406519 have price 29999', () => {
    expect(service.getOrder().getProducts()
      .find((item) => item.getId() === '09406519')).toHaveProperty('price', 29999);
  });

  it('order should save to localStorage', () => {
    const value = JSON.stringify(service.getOrder().getProducts());
    expect(localStorage.setItem).toHaveBeenCalledWith('order', value);
  });
});

describe('test removeProduct method', () => {
  const service = new OrderService();
  
  service.addProduct('09406519');
  const count = service.getOrder().getProducts().length;
  service.removeProduct('09406519');

  it('remove previous item from order', () => {
    expect(count - service.getOrder().getProducts().length).toBe(1);
  });
});

describe('test clearOrder method', () => {
  const service = new OrderService();
  
  service.addProduct('09406519');
  service.addProduct('09406519');
  service.clearOrder();

  it('all previous items should be removed from order', () => {
    expect(service.getOrder().getProducts().length).toBe(0);
  });
});

