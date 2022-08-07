import { SearchController } from "../src/scripts/controller/search.controller";
import productsData from '../src/assets/json/products.json';

describe('test sort controller', () => {
  describe('test startSearch method', () => {  
    document.body.innerHTML = `
    <input class="search__input" type="text" placeholder="Что Вы ищите?" autocomplete="off">
    <section class="search-results" id="search-results">
    </section>
  `;

  const controller = new SearchController();
    
    it ('should add info about search for word "кровати"', () => {
      const request = 'кровати';

      const searchBlock = document.getElementById('search-results');
      const infoBlock = searchBlock?.lastElementChild;

      const products = productsData.filter((item) => {
        const nameResult = item.name.indexOf(request);
        const titleRequest = item.title.indexOf(request);
        const color = item.color.indexOf(request);
        const material = item.material.findIndex((m) => m.indexOf(request) > -1);
        return nameResult >= 0 || titleRequest >= 0 || color >= 0 || material >= 0;
      });

      controller.startSearch('кровати', products.length);

      if (infoBlock) {
        expect(window.getComputedStyle(searchBlock).display).toBe('block');
        expect(infoBlock.textContent).toBe(`Найдено ${products.length} товаров`);
      }
    });
  });

  describe('test clearSearch method', () => {  
    document.body.innerHTML = `
      <input class="search__input" type="text" placeholder="Что Вы ищите?" autocomplete="off" value="кровати">
      <section class="search-results" id="search-results">
				<h2 class="search-results__title">Результаты поиска: кровати</h2>
        <p class="search-results__info">Найдено 14 товаров</p>
      </section>
    `;

    const controller = new SearchController();

    it ('should remove info about last search', () => {
      controller.clearSearch();
      
      const searchBlock = document.getElementById('search-results');
      const input = document.querySelector<HTMLInputElement>('.search__input');

      expect(searchBlock?.children.length).toBe(0);
      expect(input?.value).toBe('');
    });
  });
});