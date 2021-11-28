import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Stats {
    total: number;
    offset: number;
    limit: number;
    order: string;
    base: string;
    totalMarkets: number;
    totalExchanges: number;
    totalMarketCap: number;
    total24hVolume: number;
}

export interface Base {
    symbol: string;
    sign: string;
}

export interface Social {
    name: string;
    url: string;
    type: string;
}

export interface Link {
    name: string;
    type: string;
    url: string;
}

export interface AllTimeHigh {
    price: number;
    timestamp: number;
}

export interface Coin {
    id: number;
    uuid: string;
    slug: string;
    symbol: string;
    name: string;
    description: string;
    color: string;
    iconType: string;
    iconUrl: string;
    websiteUrl: string;
    socials: Social[];
    links: Link[];
    confirmedSupply: boolean;
    numberOfMarkets: number;
    numberOfExchanges: number;
    type: string;
    volume: number;
    marketCap: number;
    price: number;
    circulatingSupply: number;
    totalSupply: number;
    approvedSupply: boolean;
    firstSeen: number;
    listedAt: number;
    change: number;
    rank: number;
    history: string[];
    allTimeHigh: AllTimeHigh;
    penalty: boolean;   
}
export interface Data {
    stats: Stats;
    base: Base;
    coins: Coin[];
}

export interface CoinData {
    base: Base;
    coin: Coin;
}

export interface History {
    price: number;
    timestamp: number | Date;
}

export interface HistoryData {
    change: number;
    history: History[];
}

export interface RootObject {
    status: string;
    data: Data;
}

export interface RootObject_2 {
    status: string;
    data: CoinData;
}

export interface RootObject_3 {
    status: string;
    data: HistoryData;
}

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '56edf94cc7msh618513f4afff680p158436jsnf556524c0577'
}

const baseUrl: string = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<RootObject, number>({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query<RootObject_2, string>({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query<RootObject_3, { coinId: string, timePeriod: string}>({
            query: ({ coinId, timePeriod }) => createRequest(`/coin/${coinId}/history/${timePeriod}`),
        }),
    })
});

export const { 
    useGetCryptosQuery, 
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery 
} = cryptoApi;
