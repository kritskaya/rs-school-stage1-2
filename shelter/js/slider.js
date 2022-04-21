import { petsData } from './pets.js';

const prevBtn = document.querySelector('.slider-prev-btn');
const nextBtn = document.querySelector('.slider-next-btn');

const leftSliderBlock = document.querySelector('.left-slider-block');
const rightSliderBlock = document.querySelector('.right-slider-block');
const currentSliderBlock = document.querySelector('.current-slider-block');

let visibleCardsNumber = document.querySelectorAll('.pet-card').length / 3;
let petsCount = petsData.length;
alert(visibleCardsNumber + " " + petsCount);

// left btn click
export const prevBtnClickHandler = () => {
	prevBtn.addEventListener('click', leftSliderBlockShow);	
}

leftSliderBlock.addEventListener('animationend', (event) => {
	leftSliderBlock.classList.remove('left-animated');
	leftSliderBlock.classList.remove('right-animated');
	prevBtn.addEventListener('click', leftSliderBlockShow);
	nextBtn.addEventListener('click', rightSliderBlockShow);

	if (event.animationName === "move-left") {
		currentSliderBlock.innerHTML = leftSliderBlock.innerHTML;
	} else {
		currentSliderBlock.innerHTML = rightSliderBlock.innerHTML;
	}
});

const leftSliderBlockShow = () => {
	leftSliderBlock.classList.add('left-animated');
	prevBtn.removeEventListener('click', leftSliderBlockShow);
	nextBtn.removeEventListener('click', rightSliderBlockShow);
	
	generateCardBlocks("left");
}

// right btn click
export const nextBtnClickHandler = () => {
	nextBtn.addEventListener('click', rightSliderBlockShow);
}

const rightSliderBlockShow = () => {
	leftSliderBlock.classList.add('right-animated');
	prevBtn.removeEventListener('click', leftSliderBlockShow);
	nextBtn.removeEventListener('click', rightSliderBlockShow);

	generateCardBlocks("right");
}

// generate cards
let currentCardsId = [];

const generateCardBlocks = (direction) => {
	let cardsId = generateCardsId(visibleCardsNumber);

	if (direction === "left") {
		leftSliderBlock.innerHTML = "";
		
		cardsId.forEach((id) => {
			leftSliderBlock.append(createPetCardBlock(id - 1));
		});
	} else {
		rightSliderBlock.innerHTML = "";

		cardsId.forEach((id) => {
			rightSliderBlock.append(createPetCardBlock(id - 1));
		});
	}
}

const createPetCardBlock = (id) => {
	let petCard = document.createElement('div');
	petCard.classList.add('pet-card');

	let petImg = document.createElement('img');
	petImg.src = petsData[id].img;
	petImg.alt = petsData[id].name;
	petCard.classList.add('pet-img');

	let petName = document.createElement('p');
	petName.classList.add('pet-name');
	petName.textContent = petsData[id].name;

	let btn = document.createElement('button');
	btn.classList.add('pet-card-btn');
	btn.innerText = 'Learn more';

	petCard.append(petImg);
	petCard.append(petName);
	petCard.append(btn);

	return petCard;
}

const generateCardsId = (amount) => {
	let generatedIds = [];

	while (generatedIds.length < amount) {
		let number = generateNumber(8);

		if (!currentCardsId.includes(number) && !generatedIds.includes(number)) {
			generatedIds.push(number);
		}
	}

	currentCardsId = generatedIds;

	return generatedIds;
}

const generateNumber = (max) => {
	return Math.floor(Math.random() * max + 1);
}