import MarkdownRenderer from "@/components/markdown-renderer";
import { fetchAbout } from "@/fetch";
import { AboutType } from "@/types/about";


export default async function About() {
  const about = await fetchAbout<AboutType>();
  return (
    <section className="p-4 bg-white">
      <MarkdownRenderer content={about.data.content_md} />
    </section>
  );
}
