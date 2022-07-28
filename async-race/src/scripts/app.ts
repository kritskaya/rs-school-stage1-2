import { ApiService } from './service/api.service';
import { WinnersView } from './views/winners.view';

export class App {

  public async start(): Promise<void> {
    const body = document.querySelector('body');

    const view = new WinnersView();
    const car =  document.createElement('div');
    car.innerHTML = view.renderCar('#cccccc');
    body?.append(car);


    // const cars = await api.getCars();
    // console.log(cars);

    // const car = await api.getCar(3);
    // console.log(car);

    // const car2 = await api.createCar({name: 'Lada', color: '#000000'});
    // console.log(car2);

    // const code = await api.deleteCar(9);
    // console.log(code);

    // const code2 = await api.updateCar(6, { name: 'Moskvich', color: '#ffffff' });
    // console.log(code2);

    // const startEngine = await api.startEngine(1);
    // console.log('start', startEngine);

    // const drive = await api.driveCar(1);
    // console.log('drive', drive);

    // const stopEngine = await api.startEngine(1);
    // console.log('stop', stopEngine);

    // const winners = await api.getWinners();
    // console.log('winners', winners);

    // const winner = await api.getWinner(1);
    // console.log('winner', winner);

    
    // const delWinner = await api.deleteWinner(2);
    // console.log('del winner', delWinner);

    // const newW = await api.createWinner({ id: 2, wins: 2, time: 2 });
    // console.log('new', newW);

    //const updWinner = await api.updateWinner(3, { wins: 2, time: 10 });
    //console.log('upd winner', updWinner);
  }
}