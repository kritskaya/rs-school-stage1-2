import { RequestOptParameters, RequestRequiredParameters, SourcesData, NewsData, StatusCode } from '../types/types';

class Loader {
    private baseLink: string;
    private options: RequestRequiredParameters;

    constructor(baseLink: string, options: RequestRequiredParameters) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        {
            endpoint,
            options = {},
        }: {
            endpoint: string;
            options?: Partial<RequestOptParameters>;
        },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Record<string, never> | Partial<RequestOptParameters>, endpoint: string): string {
        const urlOptions: {
            [index: string]: string;
        } = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data?: NewsData | SourcesData) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
