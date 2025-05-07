export const fetchArticles = async (pagination: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&populate=*&${pagination}`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data = await response.json();
  return data;
};

export const fetchArticleBySlug = async (slug: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&populate=*&filters[slug]=${slug}`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data = await response.json();
  return data;
};

export const fetchRecipesChoiceDay = async (calories: number) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/healthy-recipies?sort=publishedAt:desc&populate=*&filters[calories][$lt]=${calories}`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data = await response.json();
  return data;
};
