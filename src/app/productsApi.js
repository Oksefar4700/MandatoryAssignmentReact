// Importerer funktioner fra Redux Toolkit og RTK Query til at oprette en API-service
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Definerer en API-service med en reducer, baseQuery og endpoints for at hente produkter
export const productsApi = createApi({
  reducerPath: 'productsApi', // Unikt navn til at identificere reduceren i store
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }), // Grundlag for alle forespørgsler
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit = 20) => `products?limit=${limit}`, // Endpoint til at hente produkter med en valgfri grænse
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`, // Endpoint til at hente et enkelt produkt ved ID
    }),
  }),
});

// Automatisk genererede hooks baseret på ovenstående endpoints til brug i React-komponenter
export const { useGetProductsQuery, useGetProductQuery } = productsApi;
