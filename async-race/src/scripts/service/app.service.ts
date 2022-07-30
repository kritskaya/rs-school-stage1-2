export class AppService {

	private garagePage: number;
	private winnersPage: number;
	animationFrameId: { [index: number]: number };

	constructor() {
		this.garagePage = 1;
		this.winnersPage = 1;
		this.animationFrameId = {};
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

	public getAnimationFrameId(carId: number): number {
		return this.animationFrameId[carId];
	}

	public setAnimationFrameId(carId: number, frameId: number) {
		this.animationFrameId[carId] = frameId;
	}


	
}