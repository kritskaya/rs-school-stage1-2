import { menuCloseEventHandler } from '../../js/menu.js';
import { prevBtnClickHandler, nextBtnClickHandler } from '../../js/slider.js';
import { cardClickHandler } from '../../js/modal.js';

window.onload = () => {
	menuCloseEventHandler();

	prevBtnClickHandler();
	nextBtnClickHandler();

	cardClickHandler();

}