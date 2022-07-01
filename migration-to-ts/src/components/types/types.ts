export interface RequestRequiredParameters {
    apiKey: string;
}

export interface RequestOptParameters {
    q: string;
    searchIn: string;
    sources: string;
    domains: string;
    excludeDomains: string;
    from: string;
    to: string;
    language: string;
    sortBy: string;
    pageSize: string;
    page: string;
}

export interface SourcesData {
    status: string;
    sources: Source[];
}

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface NewsData {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: ArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

type ArticleSource = {
    id: string;
    name: string;
};
