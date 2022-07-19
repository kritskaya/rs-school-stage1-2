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
        document
            .querySelector<Element>('.sources')
            ?.addEventListener('click', (e) =>
                this.controller.getNews(e, (data?: NewsData, source?: string) =>
                    this.view.drawNews(data as NewsData, source as string)
                )
            );
        this.controller.getSources((data?: SourcesData) => this.view.drawSources(data as SourcesData));
    }
}

export default App;
