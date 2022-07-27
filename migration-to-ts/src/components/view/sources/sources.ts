import './sources.css';
import { Source } from '../../types/types';

class Sources {
    public draw(data: Pick<Source, 'id' | 'name'>[]): void {
        const alphabet = {
            'A-D': ['a', 'b', 'c', 'd'],
            'E-H': ['e', 'f', 'g', 'h'],
            'I-L': ['i', 'j', 'k', 'l'],
            'M-P': ['m', 'n', 'o', 'p'],
            'Q-T': ['q', 'r', 's', 't'],
            'U-W': ['u', 'v', 'w'],
            'X-Z': ['x', 'y', 'z'],
        };

        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        Object.entries(alphabet).forEach((entry) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;

            const label = sourceClone.querySelector<HTMLElement>('.nav__label');
            const input = sourceClone.querySelector<HTMLElement>('.nav__input');
            const flags = sourceClone.querySelector<HTMLElement>('.nav__flags');
            const content = sourceClone.querySelector<HTMLElement>('.content');

            if (label && input && flags && content) {
                label.textContent = entry[0];
                label.setAttribute('for', entry[0].toLowerCase());

                input.id = entry[0].toLowerCase();

                entry[1].forEach((letter) => {
                    const flag = document.createElement('li');
                    flag.className = 'nav__flag flag';
                    flag.textContent = letter;

                    label.addEventListener('click', () => {
                        content.innerHTML = '';
                        content.style.display = '';
                        flags.querySelectorAll<HTMLElement>('.flag')?.forEach((item) => {
                            item.classList.remove('active');
                        });
                    });

                    flag.addEventListener('click', () => {
                        flags.querySelectorAll<HTMLElement>('.flag')?.forEach((item) => {
                            item.classList.remove('active');
                        });
                        flag.classList.add('active');

                        const filtered = data.filter((item) => item.name[0].toLowerCase() === letter);

                        content.innerHTML = '';
                        content.style.display = 'grid';

                        if (!filtered.length) {
                            const contentItem = document.createElement('li');
                            contentItem.className = 'content__item';
                            contentItem.textContent = 'Sources not found';
                            content.append(contentItem);
                        }

                        filtered.forEach((item) => {
                            const contentItem = document.createElement('li');
                            contentItem.className = 'content__item';

                            const contentLink = document.createElement('a');
                            contentLink.href = '#';
                            contentLink.className = 'content__link';
                            contentLink.textContent = item.name;
                            contentLink.setAttribute('data-source-id', item.id);
                            contentItem.append(contentLink);

                            content.append(contentItem);
                        });
                    });

                    flags.append(flag);
                });
            }
            fragment.append(sourceClone);
        });

        document.querySelector<HTMLElement>('.sources')?.append(fragment);
    }
}

export default Sources;
