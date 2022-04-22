import { burgerClickHandler } from '../../js/menu.js';
import { cardClickHandler } from '../../js/modal.js';
import { lastPageBtnClickHandler } from '../../js/pagination.js';

window.onload = () => {
	burgerClickHandler();

	cardClickHandler();

	lastPageBtnClickHandler();
}