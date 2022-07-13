import { Search } from "../../model/search.model";
import "./search.css";

export class SearchView {
	private root: HTMLElement;
	private searchInput: HTMLInputElement;
	private requestTitle: HTMLElement;
	private result: HTMLElement;
	private noFoundMessage: string = 'По Вашему запросу ничего не найдено';

	constructor() {
		this.root = document.getElementById('search-results') as HTMLElement;
		this.searchInput = document.querySelector('.search__input') as HTMLInputElement;
		this.requestTitle = this.createElement('h2', 'search-results__title');
		this.result = this.createElement('p', 'search-results__info');
	}

	public showSearchInfo(search: Search, quantity: number): void {
		this.requestTitle.textContent = `Результаты поиска: ${search.getRequest()}`;
		this.result.textContent = quantity ? `Найдено ${quantity} товаров` : this.noFoundMessage;
		this.root.append(this.requestTitle, this.result);
	}

	public clearSearchInfo(): void {
		this.searchInput.value = '';
		this.root.removeChild(this.requestTitle);
		this.root.removeChild(this.result);
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element;
	}

}