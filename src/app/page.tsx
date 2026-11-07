import { AnywhereBand } from "@/components/duo-landing/organisms/anywhere-band";
import { CategoryStrip } from "@/components/duo-landing/organisms/category-strip";
import { ChallengeBand } from "@/components/duo-landing/organisms/challenge-band";
import { CollectionsBand } from "@/components/duo-landing/organisms/collections-band";
import { FeaturesIntro } from "@/components/duo-landing/organisms/features-intro";
import { FeaturesMore } from "@/components/duo-landing/organisms/features-more";
import { FinalCta } from "@/components/duo-landing/organisms/final-cta";
import { Hero } from "@/components/duo-landing/organisms/hero";
import { SiteFooter } from "@/components/duo-landing/organisms/site-footer";
import { SiteHeader } from "@/components/duo-landing/organisms/site-header";
import { RevealRoot } from "@/components/duo-landing/use-reveal";
import "@/components/duo-landing/tokens.css";

export default function HomePage() {
  return (
    <div className="dl">
      <SiteHeader />
      <main id="main">
        <Hero />
        <CategoryStrip />
        <FeaturesIntro />
        <FeaturesMore />
        <AnywhereBand />
        <CollectionsBand />
        <ChallengeBand />
        <FinalCta />
      </main>
      <SiteFooter />
      <RevealRoot />
    </div>
  );
}
