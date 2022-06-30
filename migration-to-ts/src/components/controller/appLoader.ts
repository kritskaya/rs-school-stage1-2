import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'c8457a68878146cc9ce1a2b430945902', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
