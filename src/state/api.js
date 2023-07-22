import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.nexaflow.xyz",
    headers: { accept: "application/json", "x-api-key": "aoTgOgJ6Q8" },
  }),
  reducerPath: "adminApi",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => "/api/googleSheets/64bbf0bcbb13cb2c7dc19b88",
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = api;
