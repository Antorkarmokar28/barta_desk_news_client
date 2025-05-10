import { baseApi } from "@/redux/api/baseApi";

const newsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNews: builder.query({
      query: (params) => ({
        url: "/news",
        method: "GET",
        params: params,
      }),
    }),
    getSingleNews: builder.query({
      query: (newsId) => ({
        url: `/news/${newsId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllNewsQuery, useGetSingleNewsQuery } = newsApi;
