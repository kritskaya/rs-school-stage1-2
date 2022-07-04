import './news.css';
import { Article } from '../../types/types';

class News {
    public draw(data: Article[], source: string): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.addEventListener('click', (event) => {
            const target: HTMLElement = event.target as HTMLElement;
            if (target.classList.contains('overlay')) {
                document.body.removeChild(overlay);
                document.body.style.overflow = '';
            }
        });

        const modal = document.createElement('div');
        modal.classList.add('news__window');

        const header = document.createElement('div');
        header.className = 'news__header';

        const title = document.createElement('h2');
        title.className = 'news__title';
        title.textContent = `${source} Top News`;
        header.append(title);

        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
        });

        header.append(closeBtn);

        modal.append(header);

        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!news.length) {
            const noNews = document.createElement('p');
            noNews.textContent = 'No news found';
            modal.append(noNews);
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                item.urlToImage || './img/news_placeholder.jpg'
            })`;

            (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
            (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

            modal.append(newsClone);
        });

        overlay.append(modal);
        document.body.append(overlay);

        document.body.style.overflow = 'hidden';
    }
}

export default News;
