import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SelectValue } from 'antd/lib/select';
import { SetStateAction } from 'react';

export interface QueryContext {
    _type: string;
    originalQuery: string;
    adultIntent: boolean;
}

export interface Sort {
    _type: string;
    name: string;
    id: string;
    isSelected: boolean;
    url: string;
}

export interface Thumbnail {
    _type: string;
    contentUrl: string;
    width: number;
    height: number;
}

export interface Image {
    _type: string;
    thumbnail: Thumbnail;
}

export interface Thumbnail2 {
    _type: string;
    contentUrl: string;
}

export interface Image2 {
    _type: string;
    thumbnail: Thumbnail2;
}

export interface Provider {
    _type: string;
    name: string;
    image: Image2;
}

export interface Value {
    _type: string;
    name: string;
    url: string;
    image: Image;
    description: string;
    provider: Provider[];
    datePublished: Date;
}

export interface RootObject {
    _type: string;
    readLink: string;
    queryContext: QueryContext;
    totalEstimatedMatches: number;
    sort: Sort[];
    value: Value[];
}

const cryptoNewsApiHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '56edf94cc7msh618513f4afff680p158436jsnf556524c0577'
}

const baseUrl: string = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url: string) => ({url, headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query<RootObject, {newsCategory: SelectValue, count: number}>({
            query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;