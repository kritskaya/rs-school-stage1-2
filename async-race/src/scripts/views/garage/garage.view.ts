import { ICar } from "../../model/car.model";
import './garage.css';

export class GarageView {

	public renderGaragePage(cars: ICar[]): void{
		const page = `
		<section class="garage-page" id="garage-page">
    	${this.renderCarBlock()}
      <div class="garage garage-page__body" id="garage">
        ${this.renderGarageBody(cars)}
      </div>
		</section>
		`;

    document.body.innerHTML = '';
    document.body.insertAdjacentHTML('beforeend', page);
	}

	public renderCarBlock(): string {
		return `
		<div class="car-block">
			<div class="car-block__row car-block__row_create">
        <input class="car-block__input" type="text">
        <input class="car-block__color" type="color">
        <button class="car-block__btn btn">Create</button>
			</div>
			<div class="car-block__row car-block__row_update">
        <input class="car-block__input" type="text">
        <input class="car-block__color" type="color">
        <button class="car-block__btn btn">Update</button>
			</div>

			<div class="car-block__btns">
			  <button class="car-block__btn btn">Generate cars</button>
			</div>
		</div>
		`;
	}

  public renderGarageBody(cars: ICar[]): string {
    return `
      <div class="garage__header"></div>
        <h2 class="garage__title ">Garage</h2>
        <p class="garage__quantity">${cars.length}</p>
      </div>
      <div class="race" id="race">
        ${cars.map((car) => this.renderRaceRow(car)).join('')}
      </div>
      ${this.renderPagination()}
    `;
  }

  public renderRaceRow(car: ICar): string {
    return `
    <div class="race__row car">
      <div class="car__header">
        <button class="car__btn_select btn">Select</button>
        <button class="car__btn_remove btn">Remove</button>
        <p class="car__name">${car.name}</p>
      </div>
      <div class="row__body">
        <div class="car__btns">
          <button class="car__btn_start">A</button>
          <button class="car__btn_start">B</button>
        </div>
        <div class="car__race-line">
          ${this.renderCarImg(car.color)}
          <img class="race__flag" src="./assets/svg/flag.svg" alt="flag">
        </div>
      </div>
    </div>
    `;
  }

  public renderCarImg(color: string): string {
    return `
    <svg class="car__img" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 17.485 15" style="enable-background:new 0 0 17.485 15;" xml:space="preserve">
    <g>
      <g>
        <path style="fill:${color};" d="M17.477,8.149c-0.079-0.739-3.976-0.581-3.976-0.581L11.853,5.23H4.275L3.168,7.567H0v2.404
          l2.029,0.682c0.123-0.836,0.843-1.48,1.711-1.48c0.939,0,1.704,0.751,1.73,1.685l6.62,0.041c0.004-0.951,0.779-1.726,1.733-1.726
          c0.854,0,1.563,0.623,1.704,1.439l1.479-0.17C17.006,10.442,17.556,8.887,17.477,8.149z M4.007,7.568l0.746-1.771h2.864
          l0.471,1.771H4.007z M8.484,7.568L8.01,5.797h3.67l1.137,1.771H8.484z"/>
        <circle style="fill:${color};" cx="3.759" cy="10.966" r="1.289"/>
        <circle style="fill:${color};" cx="13.827" cy="10.9" r="1.29"/>
      </g>
    </g>
    </svg>
    `;
  }

  public renderPagination(): string {
    return `
    <div class="pagination">
      <button class="btn btn_prev">Prev</button>
      <button class="btn btn_next">Next</button>
    </div>
    `;
  }
}