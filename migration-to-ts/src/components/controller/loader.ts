import { RequestOptParameters, RequestRequiredParameters, StatusCode } from '../types/types';

class Loader {
    private baseLink: string;
    private options: RequestRequiredParameters;

    constructor(baseLink: string, options: RequestRequiredParameters) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        {
            endpoint,
            options = {},
            source,
        }: {
            endpoint: string;
            options?: Partial<RequestOptParameters>;
            source?: string;
        },
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>('GET', endpoint, callback, options, source);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === StatusCode.Unauthorized || res.status === StatusCode.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Record<string, never> | Partial<RequestOptParameters>, endpoint: string): string {
        const urlOptions: {
            [index: string]: string;
        } = { ...this.options, ...options };

        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: string,
        endpoint: string,
        callback: (data?: T, source?: string) => void,
        options = {},
        source?: string
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data, source))
            .catch((err) => console.error(err));
    }
}

export default Loader;
