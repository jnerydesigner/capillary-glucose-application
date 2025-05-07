// pages/articles/[slug].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchArticleBySlug } from "@/fetch";

export default function Page() {
  const router = useRouter();
  const { slug } = router.query; // Pega o slug da URL
  const [article, setArticle] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const data = await fetchArticleBySlug(slug as string);
        console.log(data);
        setArticle(data);
      } catch {
        setError("Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
