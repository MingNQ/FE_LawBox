import { ClientLayout } from "../../components/layout/client/ClientLayout";
import { HeroSection } from "../../components/home/HeroSection";
import { FeaturesSection } from "../../components/home/FeaturesSection";
import { NewDocumentsSection } from "../../components/home/NewDocumentsSection";
import { AIPromptSection } from "../../components/home/AIPromptSection";

export function HomePage() {
  return (
    <ClientLayout>
      <HeroSection />
      <FeaturesSection />
      <NewDocumentsSection />
      <AIPromptSection />
    </ClientLayout>
  );
}
