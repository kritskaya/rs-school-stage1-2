import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'b97ffe909d43465bb61b214f2cd7c544', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
