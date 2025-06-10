export const fetchArticles = async (pagination: string, slug: string = "") => {
  console.log("" + slug);
  let apiUrl = "";
  if (slug !== "") {
    apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&populate=*&${pagination}&filters[slug][$ne]=${slug}`;
  } else {
    apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&populate=*&${pagination}`;
  }

  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;
  console.log("API URL: " + apiUrl);

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Response: " + response.status);

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data = await response.json();
  return data;
};

export const fetchArticlesNotSlug = async (slug: string) => {
  console.log("Slug " + slug);
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&populate=*&pagination[limit]=5&filters[slug][$ne]=${slug}`;

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

export const fetchSocialMediasBySlug = async <T>(slug: string): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/social-medias?sort=publishedAt:desc&populate=*&filters[slug]=${slug}`;
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

  const data: T = await response.json();
  return data;
};

export const fetchAbout = async <T>(): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about?populate=*`;
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

  const data: T = await response.json();
  return data;
};

export const moreClicks = async <T>(
  clicks: number,
  documentId: string
): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles/${documentId}?populate=*`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;

  const body = {
    data: {
      clicks,
    },
  };

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data: T = await response.json();
  return data;
};

export const getArticleWithMoreClick = async (slug: string) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort[0]=clicks:desc&sort[1]=publishedAt:desc&populate=*&pagination[limit]=3&filters[slug][$ne]=${slug}`;
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

export const fetchHealthyRecipes = async <T>(
  pagination: string
): Promise<T> => {
  let paginate = "";
  if (pagination !== "") {
    paginate = `&${pagination}`;
  }
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/healthy-recipies?sort=publishedAt:desc&populate=*${paginate}`;
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

  const data: T = await response.json();
  return data;
};

export const fetchHealthyRecipesSlug = async <T>(slug: string): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/healthy-recipies?sort=publishedAt:desc&populate=*&filters[slug][$eq]=${slug}`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data: T = await response.json();
  return data;
};

export const fetchHealthyRecipesSlugNot = async <T>(
  slug: string
): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/healthy-recipies?sort=publishedAt:desc&populate=*&filters[slug][$ne]=${slug}&filters[stars][$gte]=4`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["healthy-recipes"],
    },
  });

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data: T = await response.json();
  return data;
};

export const fetchArticlesMoreRead = async <T>(): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*&pagination[limit]=5&sort=publishedAt:desc&sort=clicks:desc`;
  const token = process.env.NEXT_PUBLIC_STRAPI_BEARER_TOKEN;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["healthy-recipes"],
    },
  });

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data: T = await response.json();

  return data;
};

export const fetchGlucoseRead = async <T>(
  dataInitial: string,
  dateFinal: string
): Promise<T> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/capillary/1/capillary?dateInitial=${dataInitial}&dateFinal=${dateFinal}`;

  const response = await fetch(apiUrl, {
    method: "GET",
  });

  if (response.status !== 200) {
    throw new Error("Not valid");
  }

  if (!response.ok) {
    throw new Error("Not valid");
  }

  const data: T = await response.json();

  console.log("Glucose Read Data: ", data);

  return data;
};
