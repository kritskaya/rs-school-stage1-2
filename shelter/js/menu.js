
let burger = document.querySelector('.burger');
let logo = document.querySelector('.logo');
let nav = document.querySelector('header .nav');
let header = document.querySelector('header');

export const menuCloseEventHandler = () => {
	header.addEventListener('click', (event) => {
		if (event.target.classList.contains('burger') ||
			event.target.closest('.burger') ||
			(!event.target.closest('.nav.opened') && event.target.closest('.on-menu')) ||
			(event.target.classList.contains('nav-link') && event.target.closest('.opened') &&
			!event.target.closest('.logo'))) {
			toggleMenu();
		}
	});
}

const toggleMenu = () => {
	nav.classList.toggle('opened');
	header.classList.toggle('on-menu');

	if (nav.classList.contains('opened')) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}
}