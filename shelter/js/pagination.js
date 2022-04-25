import { petsData } from './pets.js';

let currentPage = 1;

let visiblePageCards;
let pagesAmount;

let allPagesCardsId = [];

const lastPageBtn = document.querySelector(".last-page-btn");
const nextPageBtn = document.querySelector(".next-page-btn");
const currentPageBtn = document.querySelector(".current-page-btn");
const previousPageBtn = document.querySelector(".previous-page-btn");
const firstPageBtn = document.querySelector(".first-page-btn");

export const firstCardsGenerate = () => {
	checkPages();
	generatePageCardsId();
	showPage();
}

export const lastPageBtnClickHandler = () => {

	lastPageBtn.addEventListener("click", () => {
		checkPages();

		if (currentPage < pagesAmount) {
			currentPageBtn.textContent = pagesAmount;
			currentPage = pagesAmount;

			showPage();

			nextPageBtn.setAttribute("disabled", true);
			lastPageBtn.setAttribute("disabled", true);
			
			firstPageBtn.removeAttribute("disabled");
			previousPageBtn.removeAttribute("disabled");
		} 
	});
}

export const firstPageBtnClickHandler = () => {

	firstPageBtn.addEventListener("click", () => {
		checkPages();

		if (currentPage > 1) {
			currentPageBtn.textContent = 1;
			currentPage = 1;

			showPage();

			firstPageBtn.setAttribute("disabled", true);
			previousPageBtn.setAttribute("disabled", true);
			
			lastPageBtn.removeAttribute("disabled");
			nextPageBtn.removeAttribute("disabled");
		} 
	});
}

export const nextPageBtnClickHandler = () => {
	nextPageBtn.addEventListener("click", () => {
		checkPages();

		if (currentPage < pagesAmount) {
			currentPageBtn.textContent = ++currentPage;
			showPage();

			if (currentPage == pagesAmount) {
				nextPageBtn.setAttribute("disabled", true);
				lastPageBtn.setAttribute("disabled", true);
			}

			if (currentPage > 1) {
				firstPageBtn.removeAttribute("disabled");
				previousPageBtn.removeAttribute("disabled");
			}
		} 
	})
}

export const previousPageBtnClickHandler = () => {

	
	previousPageBtn.addEventListener("click", () => {
		
		checkPages();
		if (currentPage > 1) {
			currentPageBtn.textContent = --currentPage;
			showPage();

			if (currentPage == 1) {
				previousPageBtn.setAttribute("disabled", true);
				firstPageBtn.setAttribute("disabled", true);
			}

			if (currentPage == pagesAmount - 1) {
				lastPageBtn.removeAttribute("disabled");
				nextPageBtn.removeAttribute("disabled");
			}
		} 
	})
}

const showPage = () => {
	const petCards = document.querySelectorAll(".pet-card");
	
	let i = 0;

	petCards.forEach(card => {
		let img = card.querySelector(".pet-img");
		img.src = petsData[allPagesCardsId[currentPage - 1][i] - 1].img;

		let name = card.querySelector(".pet-name");
		name.textContent = petsData[allPagesCardsId[currentPage - 1][i] - 1].name;

		i++;
	})
}

const generatePageCardsId = () => {
	
	for(let i = 0; i < pagesAmount; i++) {
		let generatedIds = [];

		while (generatedIds.length < 8) {
			let number = generateNumber(petsData.length);

			if (!generatedIds.includes(number)) {
				generatedIds.push(number);
			}
		}

		allPagesCardsId.push(generatedIds);
	}

	console.log(allPagesCardsId);
}

const generateNumber = (max) => {
	return Math.floor(Math.random() * max + 1);
}

const checkPages = () => {
	if (document.documentElement.clientWidth > 1279) {
		visiblePageCards = 8;
	} else if (document.documentElement.clientWidth > 767) {
		visiblePageCards = 6;
	} else {
		visiblePageCards = 3;
	}
	
	pagesAmount = 48 / visiblePageCards;
}


checkPages();