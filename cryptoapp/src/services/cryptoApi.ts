import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Data {
    total24hVolume: number;
    totalCoins: number;
    totalExchanges: number;
    totalMarketCap: number;
    totalMarkets: number;
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
            query: () => createRequest('/stats')
        })
    })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;