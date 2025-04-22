import { Author } from "@/types-dto";
import { getSocialFromUrl } from "@/utils/get-scoial-from-url";
import { SocialMediaIconSearch } from "./social-media-icon-search";

interface AuthorProps {
  author: Author;
}

export const PostAuthor = ({ author }: AuthorProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-md my-4 flex justify-center items-center flex-col">
      <div className="w-[100px] h-[100px] rounded-[50%]">
        <img
          src={author.avatar_url}
          alt={author.name}
          className="w-full h-full object-cover rounded-[50%]"
        />
      </div>
      <h2 className="font-semibold text-lg">{author.name}</h2>
      <h3 className="font-semibold text-lg mb-2">{author.specialty_title}</h3>
      <div className="h-[50px] w-full flex justify-center items-center gap-2">
        {author.social_media.social.map((social) => {
          const socialStr = getSocialFromUrl(social.url);
          const Icon = SocialMediaIconSearch(socialStr);

          return <div key={social.name}>{Icon}</div>;
        })}
      </div>
    </div>
  );
};
