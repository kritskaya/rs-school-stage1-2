import AppLoader from './appLoader';
import { NewsData, SourcesData } from '../types/types';

class AppController extends AppLoader {
    public getSources(callback: (data?: SourcesData) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data?: NewsData, source?: string) => void): void {
        let target: HTMLElement = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target?.classList.contains('content__link')) {
                const sourceId = target?.getAttribute('data-source-id');
                const sourceName = target?.textContent;
                if (sourceId && sourceName && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                                pageSize: '10',
                            },
                            source: sourceName,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
