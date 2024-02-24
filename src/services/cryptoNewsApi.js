import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'

const cryptoNewsApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST
};

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

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