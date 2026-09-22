import { Hero } from "@/components/hero";
import { SkillsMarquee } from "@/components/skills-marquee";
import { FeaturedWorks } from "@/components/featured-works";

export default function Home() {
  return (
    <>
      <Hero />
      <SkillsMarquee />
      <FeaturedWorks />
    </>
  );
}
