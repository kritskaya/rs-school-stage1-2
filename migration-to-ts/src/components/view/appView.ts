import News from './news/news';
import Sources from './sources/sources';
import { NewsData, SourcesData } from '../types/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: NewsData, source: string): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values, source);
    }

    public drawSources(data: SourcesData): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
