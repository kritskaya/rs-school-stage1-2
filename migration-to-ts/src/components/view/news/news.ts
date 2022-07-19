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

        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!news.length) {
            const noNews = document.createElement('p');
            noNews.textContent = 'No news found';
            modal.append(noNews);
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector<HTMLElement>('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) {
                photo.style.backgroundImage = `url(${
                    item.urlToImage || './img/news_placeholder.jpg'
                })`;
            }
            
            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author) {
                author.textContent = item.author || item.source.name;
            }

            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (date) {
                date.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            }

            const title = newsClone.querySelector<HTMLElement>('.news__description-title');
            if (title) {
                title.textContent = item.title;
            }
            
            const description = newsClone.querySelector<HTMLElement>('.news__description-content');
            if (description) {
                description.textContent = item.description;
            }
           
            const link = newsClone.querySelector<HTMLElement>('.news__read-more a');
            if (link) {
                link.setAttribute('href', item.url);
            }
           
            modal.append(newsClone);
        });

        overlay.append(modal);
        document.body.append(overlay);

        document.body.style.overflow = 'hidden';
    }
}

export default News;
