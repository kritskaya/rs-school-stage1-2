import { burgerClickHandler } from './menu.js';
import { prevBtnClickHandler, nextBtnClickHandler } from './slider.js';
import { cardClickHandler } from './modal.js';

window.onload = () => {
	burgerClickHandler();

	prevBtnClickHandler();
	nextBtnClickHandler();

	cardClickHandler();
}