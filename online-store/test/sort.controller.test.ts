import { SortController } from "../src/scripts/controller/sort.controller";
import { Sort } from "../src/scripts/model/sort.model";
import { SortType } from "../src/scripts/service/sort.service";

describe('test sort controller', () => {
  document.body.innerHTML = `
    <div class="actions__container action" id="sort-container">
			<button class="actions__item sort-btn">Сортировать</button>
    </div>
  `;
	const controller = new SortController();

  describe('test toggleSortList method', () => {  
    it ('should open sort list', () => {
      const btn = document.querySelector<HTMLElement>('.sort-btn');
      if (btn) {
        controller.toggleSortList(btn);
      }

      const list  = document.querySelector<HTMLElement>('.action-list');

      if (list) {
        expect(list.classList.contains('active')).toBe(true);
        expect(window.getComputedStyle(list).display).toBe('block');
      }
    });
  });

  describe('test getSort method', () => {
    it ('should return instance of Sort class', () => {
      expect(controller.getSort(SortType.AscPrice)).toBeInstanceOf(Sort);
    });
  
    it ('should return Sort with field "price" for getSort(SortType.AscPrice)', () => {
      expect(controller.getSort(SortType.AscPrice)).toHaveProperty('field', 'price');
    });
  
    it ('should return Sort with field "asc" equal true for getSort(SortType.AscPrice)', () => {
      expect(controller.getSort(SortType.AscPrice)).toHaveProperty('asc', true);
    });
  });

  describe('test loadFromStorage method', () => {
    localStorage.setItem('sort', JSON.stringify(controller.getSort(SortType.AscQuantity)));
    controller.loadFromStorage();
    
    it ('should check sort type in sort list', () => {
      const listItem = document.getElementById('quantity-asc-sort-input');
      expect((<HTMLInputElement>listItem).checked).toBe(true)
    });
  
  });
});

