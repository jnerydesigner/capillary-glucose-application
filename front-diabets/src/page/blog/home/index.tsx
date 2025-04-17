import { EditorsChoiceSection } from "@/components/editor-choice-section";
import { HeroBlog } from "@/components/hero-blog";
import { MarketingGoogleAds } from "@/components/marketing-google-ads";

export default function HomeBlog() {
  return (
    <div className="w-full h-auto flex justify-center items-center flex-col">
      <HeroBlog />
      <MarketingGoogleAds />
      <EditorsChoiceSection />
    </div>
  );
}
