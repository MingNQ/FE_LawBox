import { ClientLayout } from "@client/components/layout/ClientLayout";
import { HeroSection } from "@client/components/home/HeroSection";
import { FeaturesSection } from "@client/components/home/FeaturesSection";
import { NewDocumentsSection } from "@client/components/home/NewDocumentsSection";
import { AIPromptSection } from "@client/components/home/AIPromptSection";

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
