import { dataManaus } from "@/utils/dayjs";
import { ApiAxios } from "./api-config";
import axios from "axios";
import { ResponseTypeArticles, ResponseTypeHealthy } from "@/types-dto";

export const fetchCapillary = async ({
  dateInitial,
  dateFinal,
}: {
  dateInitial: string;
  dateFinal: string;
}) => {
  console.log(dateInitial, dateFinal);
  // const token = localStorage.getItem("token");
  // const profile = await ApiAxios.get<OutputTokenProfile>("/auth/profile", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // const { sub: id } = profile.data;

  const response = await fetch(
    `http://localhost:3444/capillary/1/capillary?dateInitial=${encodeURIComponent(
      dateInitial
    )}&dateFinal=${encodeURIComponent(dateFinal)}`
  );

  console.log(response);

  if (!response.ok) {
    throw new Error(
      `Error: Status -> ${response.status} Message -> ${response.statusText}`
    );
  }

  return response.json();
};

// type OutputTokenProfile = {
//   sub: number;
//   username: string;
//   iat: number;
//   exp: number;
// };

export const fetchCreateGlucose = async (value: number) => {
  const create: InputGlucose = {
    dateTime: dataManaus.format(),
    userId: 1,
    period: "06:00",
    value,
  };

  console.log(create);
  try {
    await ApiAxios.post<OutputGlucose>("/capillary", create);
  } catch (er) {
    console.log(er);
  }
};

export const fetchLogin = async (username: string, password: string) => {
  const body = {
    username,
    password,
  };

  const response = await ApiAxios.post<ResponseLogin>("/auth/login", body);

  return response.data;
};

export const fetchArticles = async (pagination: string) => {
  const response = await axios.get<ResponseTypeArticles>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/api/articles?sort=publishedAt:desc&populate=*&${pagination}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_BEARER_TOKEN}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  return response.data;
};

export const fetchHealthyRecipes = async (pagination: string) => {
  let paginate = "";
  if (pagination !== "") {
    paginate = `&${pagination}`;
  }
  const response = await axios.get<ResponseTypeHealthy>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/api/healthy-recipies?sort=publishedAt:desc&populate=*${paginate}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_BEARER_TOKEN}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  return response.data;
};

export const fetchHealthyRecipesSlug = async (slug: string) => {
  const response = await axios.get<ResponseTypeHealthy>(
    `${
      import.meta.env.VITE_STRAPI_API_URL
    }/api/healthy-recipies?sort=publishedAt:desc&populate=*&filters[slug][$eq]=${slug}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_BEARER_TOKEN}`,
      },
    }
  );

  console.log(response.data);

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  return response.data;
};

export type ResponseLogin = {
  access_token: string;
};

export type InputGlucose = {
  dateTime: string;
  value: number;
  userId: number;
  period: string;
};

export type OutputGlucose = {
  id: number;
  value: number;
  date_time_collect: string;
  period: string;
  user_id: number;
};
