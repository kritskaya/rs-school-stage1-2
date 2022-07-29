import { IWinner } from '../../model/winner.nodel';
import './winners.css';

export class WinnersView {
  private root: HTMLElement;
  private counter: HTMLElement;

  public renderWinnerPage(winners: IWinner[]): void {
    const page = `
    <section class="winners" id="winners-page">
      <div class="winners__header">
        <h2 class="winners__title">Winners</h2>
        <p class="winners__quantity" id="winners-quantity">(3)</p>
      </div>
      <div class="winners__pages">
        <p class="winners__page">Page</p><p class="page-number">#1</p>
      </div>
      ${this.renderWinnerTable(winners)}
    </section>
    `;

    const main = document.getElementById('main');

    if (main) {
      main.insertAdjacentHTML('beforeend', page);

      this.root = document.getElementById("winners-page")!;
      this.counter = document.getElementById("winners-quantity")!;
    }
  }

  public renderWinnerTable(winners: IWinner[]): string {
    return `
    <div class="winners__table winner-table">
      <div class="winner-table__headers headers">
        <p class="winner-table__header winners__number">N ↑</p>
        <p class="winner-table__header winners__car">Car ↑</p>
        <p class="winner-table__header winners__name">Name ↑</p>
        <p class="winner-table__header winners__wins">Wins ↑</p>
        <p class="winner-table__header winners__time">Best time ↑</p>
      </div>
      ${ winners.map((winner) => this.renderWinnerRow(winner)).join('') }
    </div>
    ${this.renderPagination()}
    `;
  }

  public renderWinnerRow(winner: IWinner): string {
    console.log('jgkfjg',winner.car.color);
    return `
    <div class="winner-table__row">
      <p class="winner-table__cell">${winner.id}</p>
      <p class="winner-table__cell">
        ${this.renderCarImg(winner.car.color)}
      </p>
      <p class="winner-table__cell">${winner.car?.name}</p>
      <p class="winner-table__cell">${winner.wins}</p>
      <p class="winner-table__cell">${winner.time}</p>
    </div>
    `;
  }

  public renderPagination(): string {
    return `
    <div class="winners__btns">
      <button class="winners__btn btn">Prev</button>
      <button class="winners__btn btn">Next</button>
    </div>
    `;
  }

  public renderCarImg(color: string): string {
    return `
    <svg class="winner-table__img" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

  public showWinnersPage(winners: IWinner[]): void {
    document.getElementById('garage-page')!.style.display = 'none';
    document.getElementById('winners-page')!.style.display = 'block';

    this.root.lastElementChild?.remove();
    
    const winnerTable = this.renderWinnerTable(winners);
    this.root.insertAdjacentHTML('beforeend', winnerTable);
  }

}