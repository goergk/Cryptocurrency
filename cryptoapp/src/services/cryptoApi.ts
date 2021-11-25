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
    price: string;
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
    price: string;
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

export interface RootObject {
    status: string;
    data: Data;
}

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '56edf94cc7msh618513f4afff680p158436jsnf556524c0577'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url: string) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoAPI',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query<RootObject, void>({
            query: () => createRequest('/coins')
        })
    })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;
