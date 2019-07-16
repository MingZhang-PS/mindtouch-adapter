export interface IArticle {
    id: string;
    provider: string;
    title?: string;
    content?: string;
    lastUpdated?: Date;
    score?: number;
    link?: string;
    renderType?: 'IFRAME' | 'RAW_CONTENT' | 'PDF';
    renderValue?: string;
    views?: number;
    author?: string;
    category?: string;
    upvotes?: number;
    devotes?: number;
    tag?: string[];
}
