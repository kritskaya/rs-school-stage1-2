import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, SourcesData } from '../types/types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        document.querySelector<Element>('.sources')?.addEventListener('click', (e) =>
            this.controller.getNews(e, (data, source) => {
                if (data && source) {
                    this.view.drawNews(data, source);
                }
            })
        );
        this.controller.getSources((data?: SourcesData) => this.view.drawSources(data as SourcesData));
    }
}

export default App;
