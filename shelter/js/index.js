import { burgerClickHandler } from './menu.js';
import { prevBtnClickHandler, nextBtnClickHandler } from './slider.js';

window.onload = () => {
	burgerClickHandler();

	prevBtnClickHandler();
	nextBtnClickHandler();
}