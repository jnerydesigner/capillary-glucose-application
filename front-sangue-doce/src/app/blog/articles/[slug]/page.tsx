// src/app/blog/articles/[slug]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchArticleBySlug, fetchSocialMediasBySlug } from "@/fetch";
import { RichTextRenderer } from "@/components/tich-text-rendering.tsx";
import { ResponseTypeArticles } from "@/types/articles";
import Image from "next/image";
import { SocialsMediaType } from "@/types/social-media";
import Link from "next/link";

export default function Page() {
  const pathname = usePathname();
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const [article, setArticle] = useState<ResponseTypeArticles | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [socialMediaIcons, setSocialMediaIcons] = useState<React.ReactNode>([]);

  useEffect(() => {
    if (pathname) {
      const stringUrl = "/blog/articles/";
      const pathSlug = pathname.substring(stringUrl.length);
      setSlug(pathSlug as string);
    }
  }, [pathname]);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const data: ResponseTypeArticles = await fetchArticleBySlug(slug);
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

  useEffect(() => {
    const fetchSocialMediaIcons = async () => {
      if (article) {
        const icons = await Promise.all(
          article.data[0].author.social_media.social.map(async (social) => {
            const socialMedia = await fetchSocialMediasBySlug<SocialsMediaType>(
              social.slug
            );
            return (
              <div key={social.slug} className="w-8 h-8">
                <Link
                  href={social.url}
                  className="h-full w-full"
                  target="_blank"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${socialMedia.data[0].icon.url}`}
                    height={200}
                    alt={socialMedia.data[0].title}
                    width={200}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            );
          })
        );
        setSocialMediaIcons(icons);
      }
    };
    fetchSocialMediaIcons();
  }, [article]);

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
    <>
      <div className="w-full h-[500px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${article.data[0].cover.url}`}
          alt={article.data[0].title}
          className="w-full h-full object-cover"
          width={1000}
          height={1000}
          priority
        />
      </div>
      <div className="w-full h-16 flex justify-start items-center gap-4">
        <div className="w-8 h-8">
          <Image
            src={`${article.data[0].author.avatar_url}`}
            alt={article.data[0].title}
            className="w-full h-full object-cover rounded-full"
            width={1000}
            height={1000}
          />
        </div>
        <h2>{article.data[0].author.name}</h2>
        {socialMediaIcons}
      </div>
      <h1 className="text-center text-3xl my-10 font-bold">
        {article.data[0].title}
      </h1>
      <RichTextRenderer content={article.data[0].contentNew} />
    </>
  );
}
