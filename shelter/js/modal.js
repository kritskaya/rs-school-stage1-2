import { petsData } from "./pets.js";

const cardsBlock = document.querySelector(".slider-cards");

export const cardClickHandler = () => {
	cardsBlock.addEventListener("click", (event) => {
		if (event.target.parentElement.classList.contains('pet-card')) {
			let id = event.target.parentElement.getAttribute('data-id');
			showModal(id);
		}
	})
}


const showModal = (petId) => {
	let overlay = document.createElement('div');
	overlay.classList.add('overlay');
	overlay.addEventListener("click", (event) => {
		if (event.target.classList.contains("overlay")) {
			document.body.removeChild(overlay);
		}
	});

	let modal = document.createElement('div');
	modal.classList.add('modal-window');

	let wrapper = document.createElement('div');
	wrapper.classList.add('modal-wrapper');

	let closeBtn = document.createElement('div');
	closeBtn.classList.add('modal-close-btn');
	closeBtn.addEventListener("click", () => {
		document.body.removeChild(overlay);
	});
	
	let image = document.createElement('img');
	image.classList.add('modal-img');
	image.src = petsData[petId - 1].img;

	let content = document.createElement('div');
	content.classList.add('modal-content');

	let title = document.createElement('h2');
	title.classList.add('modal-title');
	title.textContent = petsData[petId - 1].name;

	let subTitle = document.createElement('h3');
	subTitle.classList.add('modal-subtitle');
	subTitle.textContent = `${petsData[petId - 1].type} - ${petsData[petId - 1].breed}`;

	let text = document.createElement('div');
	text.classList.add('modal-text');
	text.textContent = petsData[petId - 1].description;

	let list = document.createElement('ul');

	let itemAge = document.createElement('li');
	itemAge.classList.add('modal-list-item');
	itemAge.innerHTML = '<strong>Age:</strong> ' + petsData[petId - 1].age;

	let itemInoculations = document.createElement('li');
	itemInoculations.classList.add('modal-list-item');
	itemInoculations.innerHTML = '<strong>Inoculations:</strong> ' + petsData[petId - 1].inoculations;

	let itemDiseases = document.createElement('li');
	itemDiseases.classList.add('modal-list-item');
	itemDiseases.innerHTML = '<strong>Diseases:</strong> ' + petsData[petId - 1].diseases;

	let itemParasites = document.createElement('li');
	itemParasites.classList.add('modal-list-item');
	itemParasites.innerHTML = '<strong>Parasites:</strong> ' + petsData[petId - 1].parasites;

	list.append(itemAge);
	list.append(itemInoculations);
	list.append(itemDiseases);
	list.append(itemParasites);

	content.append(title);
	content.append(subTitle);
	content.append(text);
	content.append(list);

	wrapper.append(image);
	wrapper.append(content);

	modal.append(wrapper);
	modal.append(closeBtn);

	overlay.append(modal);

	document.body.append(overlay);
}

