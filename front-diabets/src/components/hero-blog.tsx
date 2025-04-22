import { ResponseTypeArticles } from "@/types-dto";
// import { calculateReadingTime } from "@/utils/calculate-read-times";
import { dateFormatBlogType } from "@/utils/date-format-blog-type";
import { FaRegHeart } from "react-icons/fa";

type BlogTypeNotices = {
  id: number;
  firstNotice: {
    img: string;
    alt: string;
    category: string;
    title: string;
    slug: string;
    author: string;
    datePublish: string;
    timeRead: string;
  };
  fourNotices: {
    id: number;
    img: string;
    alt: string;
    category: string;
    title: string;
    slug: string;
    author: string;
    datePublish: string;
    timeRead: string;
  }[];
};

const newsBlog: BlogTypeNotices = {
  id: 1,
  firstNotice: {
    img: "https://conteudo.imguol.com.br/c/entretenimento/72/2024/11/06/canetas-emagrecedoras-ozempic-mounjaro-wegovy-1730898072753_v2_300x225.jpg.webp",
    alt: "Notícia Principal",
    category: "SAÚDE",
    title: "Ozempic traz efeitos colaterais, e controle médico é fundamental",
    slug: "ozempic-traz-efeitos-colaterais-e-controle-medico-e-fundamental",
    author: "Jander Nery",
    datePublish: "17 Abril, 2025",
    timeRead: "20 minutos",
  },
  fourNotices: [
    {
      id: 2,
      img: "https://conteudo.imguol.com.br/c/entretenimento/72/2024/11/06/canetas-emagrecedoras-ozempic-mounjaro-wegovy-1730898072753_v2_300x225.jpg.webp",
      alt: "Diabetes",
      category: "SAÚDE",
      title: "Projeto facilita acesso a tratamento de diabetes do tipo 1",
      slug: "projeto-facilita-acesso-a-tratamento-de-diabetes-do-tipo-1",
      author: "Jander Nery",
      datePublish: "17 Abril, 2025",
      timeRead: "20 minutos",
    },
    {
      id: 3,
      img: "https://conteudo.imguol.com.br/c/entretenimento/72/2024/11/06/canetas-emagrecedoras-ozempic-mounjaro-wegovy-1730898072753_v2_300x225.jpg.webp",
      alt: "Notícia Principal",
      category: "SAÚDE",
      title: "Ozempic traz efeitos colaterais, e controle médico é fundamental",
      slug: "ozempic-traz-efeitos-colaterais-e-controle-medico-e-fundamental",
      author: "Jander Nery",
      datePublish: "17 Abril, 2025",
      timeRead: "20 minutos",
    },
    {
      id: 4,
      img: "https://conteudo.imguol.com.br/c/entretenimento/72/2024/11/06/canetas-emagrecedoras-ozempic-mounjaro-wegovy-1730898072753_v2_300x225.jpg.webp",
      alt: "Notícia Principal",
      category: "SAÚDE",
      title: "Ozempic traz efeitos colaterais, e controle médico é fundamental",
      slug: "ozempic-traz-efeitos-colaterais-e-controle-medico-e-fundamental",
      author: "Jander Nery",
      datePublish: "17 Abril, 2025",
      timeRead: "20 minutos",
    },
    {
      id: 5,
      img: "https://conteudo.imguol.com.br/c/entretenimento/72/2024/11/06/canetas-emagrecedoras-ozempic-mounjaro-wegovy-1730898072753_v2_300x225.jpg.webp",
      alt: "Notícia Principal",
      category: "SAÚDE",
      title: "Ozempic traz efeitos colaterais, e controle médico é fundamental",
      slug: "ozempic-traz-efeitos-colaterais-e-controle-medico-e-fundamental",
      author: "Jander Nery",
      datePublish: "17 Abril, 2025",
      timeRead: "20 minutos",
    },
  ],
};

interface Articles {
  articles: ResponseTypeArticles;
}

export const HeroBlog = ({ articles }: Articles) => {
  console.log("Articles", articles.data);
  console.log(
    "Url Image",
    `${import.meta.env.VITE_STRAPI_API_URL}${articles.data[0].cover.url}`
  );
  return (
    <section className="grid grid-cols-3 gap-4 px-4 my-4">
      <div className="col-span-1 relative rounded-lg overflow-hidden shadow-md">
        <div className="absolute right-2 top-2">
          <FaRegHeart className="text-[2.6rem] text-red-500 relative" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[1rem] font-bold text-red-500">
            {articles.data[0].likes}
          </span>
        </div>
        <img
          src={`${import.meta.env.VITE_STRAPI_API_URL}${
            articles.data[0].cover.url
          }`}
          alt={newsBlog.firstNotice.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white flex flex-col justify-end">
          <span className="bg-red-500 text-white px-3 py-1 rounded text-xs w-fit mb-2">
            {articles.data[0].category.name}
          </span>
          <h2 className="text-xl font-bold">{articles.data[0].title}</h2>
          <div className="flex gap-4 text-sm mt-2 text-gray-300">
            <span>👤 {articles.data[0].author.name}</span>
            <span>📅 {dateFormatBlogType(articles.data[0].publishedAt)}</span>
            {/* <span>⏱ {calculateReadingTime(articles.data[0].content)}</span> */}
          </div>
        </div>
      </div>
      <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-4">
        {articles.data &&
          articles.data.map((notice) => {
            if (notice.id !== articles.data[0].id) {
              return (
                <div
                  key={notice.id}
                  className="relative rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={`${import.meta.env.VITE_STRAPI_API_URL}${
                      notice.cover.url
                    }`}
                    alt={notice.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 text-white flex flex-col justify-end">
                    <span className="bg-pink-500 text-white px-2 py-0.5 rounded text-xs w-fit mb-1">
                      {notice.category.name}
                    </span>
                    <p className="text-sm font-semibold leading-tight">
                      {notice.title}
                    </p>
                    <span className="text-xs text-gray-300 mt-1">
                      {/* 📅 {calculateReadingTime(notice.content)} */}
                    </span>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </section>
  );
};
