import { menuCloseEventHandler } from '../../js/menu.js';
import { cardClickHandler } from '../../js/modal.js';
import { 
			lastPageBtnClickHandler, 
			firstPageBtnClickHandler,
			nextPageBtnClickHandler,
			previousPageBtnClickHandler,
			firstCardsGenerate,
			resizeWindowHandler 
		 } from '../../js/pagination.js';

window.onload = () => {
	menuCloseEventHandler();

	cardClickHandler();

	lastPageBtnClickHandler();
	firstPageBtnClickHandler();
	nextPageBtnClickHandler();
	previousPageBtnClickHandler();
	firstCardsGenerate();
	

}

window.onresize = () => {
	resizeWindowHandler();
}