import { Search } from "../model/search.model";

export class SearchService {
	private searchHistory: Search[];

	constructor() {
		// for the future needs
		this.searchHistory = [];
	}
}