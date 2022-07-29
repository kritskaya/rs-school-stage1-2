export class AppService {

	private garagePage: number;
	private winnersPage: number;

	constructor() {
		this.garagePage = 1;
		this.winnersPage = 1;
	}

	public getGaragePage(): number {
		return this.garagePage;
	}

	public setGaragePage(page: number) {
		this.garagePage = page;
	}

	public getWinnersPage(): number {
		return this.winnersPage;
	}

	public setWinnersPage(page: number) {
		this.winnersPage = page;
	}
}