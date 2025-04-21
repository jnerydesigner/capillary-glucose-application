import { fetchArticles } from "@/api";
import { EditorsChoiceSection } from "@/components/editor-choice-section";
import { HeroBlog } from "@/components/hero-blog";
import { MarketingGoogleAds } from "@/components/marketing-google-ads";
import { useQuery } from "@tanstack/react-query";

export default function HomeBlog() {
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchArticles("pagination[limit]=5"),
  });

  if (isLoading || !data) {
    return (
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <div className="w-full h-auto flex justify-center items-center flex-col">
      <HeroBlog articles={data} />
      <MarketingGoogleAds />
      <EditorsChoiceSection />
    </div>
  );
}
