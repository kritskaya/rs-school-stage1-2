import { BaseView } from "../BaseView";
import "./search.css";

export class SearchView extends BaseView {
	private root: HTMLElement;
	private searchInput: HTMLInputElement;
	private requestTitle: HTMLElement;
	private result: HTMLElement;
	private noFoundMessage = 'По Вашему запросу ничего не найдено';

	constructor() {
		super();

		const rootElement = document.getElementById('search-results');
		if (rootElement) {
			this.root = rootElement;
		}
		
		this.requestTitle = this.createElement('h2', 'search-results__title');
		this.result = this.createElement('p', 'search-results__info');
		
		const searchElement = document.querySelector<HTMLInputElement>('.search__input');
		if (searchElement) {
			this.searchInput = searchElement;
			this.searchInput.focus();
		}
	}

	public getSearchInput(): HTMLInputElement {
		return this.searchInput;
	}

	public showSearchInfo(request: string, quantity: number): void {
		if (request) {
			this.requestTitle.textContent = `Результаты поиска: ${request}`;
			this.result.textContent = quantity ? `Найдено ${quantity} товаров` : this.noFoundMessage;
			this.root.append(this.requestTitle, this.result);
		}		
	}

	public clearSearchInfo(): void {
		this.searchInput.value = '';

		Array.from(this.root.children).forEach(element => {
			this.root.removeChild(element);
		});
	}

	protected createElement(tag: string, className: string): HTMLElement {
		const element = document.createElement(tag);
		element.className = className;
		return element;
	}
}