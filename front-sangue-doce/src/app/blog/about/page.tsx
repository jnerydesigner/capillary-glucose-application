export default function About() {
  const urlStrapi = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  return <h1>About - {urlStrapi}</h1>;
}
