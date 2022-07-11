import { SortService, SortType } from "../service/sort.service";
import { SortView } from "../view/sort/sort.view";

export class SortController {
	private service: SortService;
	private view: SortView;

	constructor() {
		this.service = new SortService();
		this.view = new SortView(this.service.getSorts());
	}

}