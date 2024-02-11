import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders = {
    'X-RapidAPI-Key': '127d36f10dmshd58ba00cf16721ep193166jsnb07395c910c1',
    'X-RapidAPI-Host': 'news67.p.rapidapi.com'
};

const baseUrl = 'https://news67.p.rapidapi.com/v2';

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders })

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => createRequest(`/topic-search?search=${newsCategory}&batchSize=${count}&languages=en`),
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;