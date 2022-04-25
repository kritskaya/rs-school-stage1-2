import { menuCloseEventHandler } from '../../js/menu.js';
import { prevBtnClickHandler, nextBtnClickHandler } from '../../js/slider.js';
import { cardClickHandler } from '../../js/modal.js';
//import { lastPageBtnClickHandler } from '../../js/pagination.js';

window.onload = () => {
	menuCloseEventHandler();

	prevBtnClickHandler();
	nextBtnClickHandler();

	cardClickHandler();

	//lastPageBtnClickHandler();
}