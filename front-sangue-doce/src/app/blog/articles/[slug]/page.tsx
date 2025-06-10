import {
  fetchArticleBySlug,
  fetchSocialMediasBySlug,
  moreClicks,
} from "@/fetch";
import { RichTextRenderer } from "@/components/rich-text-rendering";
import {
  ResponseTypeArticles,
  ResponseTypeArticlesUnit,
} from "@/types/articles";
import Image from "next/image";

import Link from "next/link";
import { SocialsMediaType } from "@/types/social-media";
import { ReactNode } from "react";
import { AsideNews } from "@/components/aside-news";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const slugArticle = params.slug;
  const article: ResponseTypeArticles = await fetchArticleBySlug(slugArticle);
  const qtdClicks = Number(article.data[0].clicks) + 1;
  const articleUnit = await moreClicks<ResponseTypeArticlesUnit>(
    qtdClicks,
    article.data[0].documentId
  );

  let socialMediaIcons: ReactNode[] = [];

  if (articleUnit.data.author.social_media?.social?.length > 0) {
    const icons = await Promise.all(
      articleUnit.data.author.social_media.social.map(async (social) => {
        const socialMedia = await fetchSocialMediasBySlug<SocialsMediaType>(
          social.slug
        );

        return (
          <div key={social.slug} className="w-8 h-8">
            <Link href={social.url} target="_blank" className="h-full w-full">
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

    socialMediaIcons = icons;
  }

  return (
    <>
      <main className="h-auto col-span-12 md:col-span-9 flex justify-start items-center flex-col p-2 bg-white mt-2">
        <div className="w-full h-50 md:h-[500px]">
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${articleUnit.data.cover.url}`}
            alt={articleUnit.data.title}
            className="w-full h-full object-cover"
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="w-full h-16 flex justify-center md:justify-start items-center gap-4">
          <div className="w-8 h-8">
            <Image
              src={`${articleUnit.data.author.avatar_url}`}
              alt={articleUnit.data.title}
              className="w-full h-full object-cover rounded-full"
              width={1000}
              height={1000}
            />
          </div>
          <h2>{articleUnit.data.author.name}</h2>
          {socialMediaIcons}
        </div>
        <h1 className="text-center text-3xl my-10 font-bold">
          {articleUnit.data.title}
        </h1>
        <RichTextRenderer content={articleUnit.data.contentNew} />
      </main>
      <div className="invisible md:visible col-span-3 h-auto">
        <AsideNews slug={articleUnit.data.slug} />
      </div>
    </>
  );
}
