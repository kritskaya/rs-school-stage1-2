import { OrderController } from "../src/scripts/controller/order.controller";

describe('test order controller', () => {

  describe('test toggleOrderList method', () => {
    document.body.innerHTML = `
    <div class="header__cart cart" id="cart-container">
      <button class="cart__btn cart-btn" id="cart-btn">
        <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="">
      </button>
    </div>
    `;

    it ('should open order list', () => {
      const controller = new OrderController();
      const orderList = document.querySelector<HTMLElement>('.cart__list');

      controller.toggleOrderList();
      if (orderList) {
        expect(window.getComputedStyle(orderList).display).toBe('block');
      }
    });
  });

  describe('test addToOrder method', () => {
    
    it ('should add product to cart list', () => {
      document.body.innerHTML = `
      <div class="header__cart cart" id="cart-container">
        <button class="cart__btn cart-btn" id="cart-btn">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="">
        </button>
      </div>
  
      <div class="products__item product" data-id="70458953" style="display: block;">
        <a class="product__imgs" href="#">
          <img class="product__img" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953.jpg" alt="product image">
          <img class="product__img_hover" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953_hover.jpg" alt="product image">
        </a>
        <h3 class="product__title">ИДАНЭС</h3>
        <p class="product__description">Каркас кровати с обивкой, розовый, 180x200</p>
        <p class="product__id">Артикул: 70458953</p>
        <p class="product__amount">На складе: 15</p>
        <p class="product__popular">Популярный: нет</p>
        <p class="product__materials">Материалы: ДСП, ДВП, массив дерева</p>
        <p class="product__price">42999 P</p>
        <button class="product__btn cart-btn" title="Добавить в корзину">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="add to cart">
        </button>
      </div>
      `;
      const controller = new OrderController();


      const btn = document.querySelector<HTMLElement>('.product__btn');
      controller.addToOrder({currentTarget: btn} as MouseEvent);

      const list = document.querySelector<HTMLElement>('.cart__list');
      const lastItem = list?.lastElementChild;
      
      expect(lastItem).not.toBe(null);
      expect((<HTMLElement>lastItem).dataset.id).toBe('70458953');
    });
  });

  describe('test removeFromOrder method', () => {
    
    it ('should remove product to cart list', () => {
      document.body.innerHTML = `
      <div class="header__cart cart" id="cart-container">
        <button class="cart__btn cart-btn" id="cart-btn">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="">
        </button>
      </div>

      <div class="products__item product" data-id="70458953" style="display: block;">
        <a class="product__imgs" href="#">
          <img class="product__img" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953.jpg" alt="product image">
          <img class="product__img_hover" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953_hover.jpg" alt="product image">
        </a>
        <h3 class="product__title">ИДАНЭС</h3>
        <p class="product__description">Каркас кровати с обивкой, розовый, 180x200</p>
        <p class="product__id">Артикул: 70458953</p>
        <p class="product__amount">На складе: 15</p>
        <p class="product__popular">Популярный: нет</p>
        <p class="product__materials">Материалы: ДСП, ДВП, массив дерева</p>
        <p class="product__price">42999 P</p>
        <button class="product__btn cart-btn" title="Добавить в корзину">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="add to cart">
        </button>
      </div>
      `;

      const controller = new OrderController();
      
      const btn = document.querySelector<HTMLElement>('.product__btn');
      controller.addToOrder({currentTarget: btn} as MouseEvent);
      controller.removeFromOrder({target: btn} as MouseEvent);

      const list = document.querySelector<HTMLElement>('.cart__list');
      const item = list?.querySelector<HTMLElement>('.cart-item[data-id="70458953"]');
      
      expect(item).toBe(null);
    });
  });

  describe('test clearOrder method', () => {
    
    it ('should clear cart list', () => {
      document.body.innerHTML = `
      <div class="header__cart cart" id="cart-container">
        <button class="cart__btn cart-btn" id="cart-btn">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="">
        </button>
      </div>

      <div class="products__item product" data-id="70458953" style="display: block;">
        <a class="product__imgs" href="#">
          <img class="product__img" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953.jpg" alt="product image">
          <img class="product__img_hover" src="./assets/img/products/idanes-karkas-krovati-bledno-rozovyy__70458953_hover.jpg" alt="product image">
        </a>
        <h3 class="product__title">ИДАНЭС</h3>
        <p class="product__description">Каркас кровати с обивкой, розовый, 180x200</p>
        <p class="product__id">Артикул: 70458953</p>
        <p class="product__amount">На складе: 15</p>
        <p class="product__popular">Популярный: нет</p>
        <p class="product__materials">Материалы: ДСП, ДВП, массив дерева</p>
        <p class="product__price">42999 P</p>
        <button class="product__btn cart-btn" title="Добавить в корзину">
          <img class="cart-btn__img" src="./assets/icon/shopping-cart.png" alt="add to cart">
        </button>
      </div>
      `;

      const controller = new OrderController();
      
      const btn = document.querySelector<HTMLElement>('.product__btn');
      controller.addToOrder({currentTarget: btn} as MouseEvent);
      controller.clearOrder();

      const list = document.querySelector<HTMLElement>('.cart__list');
      expect(list?.children.length).toBe(1);
      expect(list?.firstChild?.textContent).toBe('Корзина пуста');
    });
  });
})
