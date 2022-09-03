import { AppController } from './controller/app.controller';

export class App {
  private controller: AppController;

  public async start(): Promise<void> {
    this.controller = new AppController();
    await this.controller.renderApp();
    
    this.controller.garageEventHandler();
    this.controller.winnersEventHandler();
    this.controller.generalEventHadler();
  }
}