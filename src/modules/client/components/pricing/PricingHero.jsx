import { useLanguage } from "@shared/hooks/useLanguage";

export function PricingHero() {
  const { t } = useLanguage();

  return (
    <div className="text-center py-12 px-6">
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
        {t("pricing.title")}
      </h1>
      <div className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        {t("pricing.subtitle")}
      </div>
    </div>
  );
}
