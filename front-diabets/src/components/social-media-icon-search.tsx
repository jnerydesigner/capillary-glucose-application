import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTiktok,
  FaGlobe,
} from "react-icons/fa";

const iconBase =
  "w-[30px] h-[30px] transition-transform duration-300 hover:scale-110 cursor-pointer";

export const SocialMediaIconSearch = (social: string) => {
  switch (social.toLowerCase()) {
    case "youtube":
      return (
        <FaYoutube className={`${iconBase} text-red-600 hover:text-red-700`} />
      );
    case "instagram":
      return (
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform duration-300">
          <FaInstagram className="text-white" />
        </div>
      );
    case "facebook":
      return (
        <FaFacebook
          className={`${iconBase} text-blue-600 hover:text-blue-700`}
        />
      );
    case "twitter":
      return (
        <FaTwitter className={`${iconBase} text-sky-500 hover:text-sky-600`} />
      );
    case "tiktok":
      return (
        <FaTiktok className={`${iconBase} text-black hover:text-gray-800`} />
      );
    default:
      return (
        <FaGlobe className={`${iconBase} text-gray-500 hover:text-gray-600`} />
      );
  }
};
