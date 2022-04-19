
let burger = document.querySelector('.burger');
let logo = document.querySelector('.logo');
let nav = document.querySelector('header .nav');
let header = document.querySelector('header');

export const burgerClickHandler = () => {
	burger.addEventListener('click', toggleMenu);
}

const toggleMenu = () => {
	nav.classList.toggle('opened');
	header.classList.toggle('on-menu');
}