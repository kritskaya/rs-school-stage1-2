import { burgerClickHandler } from '../../js/menu.js';
import { cardClickHandler } from '../../js/modal.js';
import { 
			lastPageBtnClickHandler, 
			firstPageBtnClickHandler,
			nextPageBtnClickHandler,
			previousPageBtnClickHandler,
			firstCardsGenerate 
		 } from '../../js/pagination.js';

window.onload = () => {
	burgerClickHandler();

	cardClickHandler();

	lastPageBtnClickHandler();
	firstPageBtnClickHandler();
	nextPageBtnClickHandler();
	previousPageBtnClickHandler();
	firstCardsGenerate();
}