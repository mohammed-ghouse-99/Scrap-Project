import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Pricing } from "@/components/sections/Pricing";
import { LeadForm } from "@/components/sections/LeadForm";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CommercialSectors } from "@/components/sections/CommercialSectors";
import { Reviews } from "@/components/sections/Reviews";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Hero />

        <div id="categories">
          <Categories />
        </div>

        <div id="commercial-sectors">
          <CommercialSectors />
        </div>

        <div id="pricing">
          <Pricing />
        </div>

        <div id="reviews">
          <Reviews />
        </div>

        <div id="why-us">
          <WhyChooseUs />
        </div>

        <LeadForm />
      </main>

      <Footer />
    </div>
  );
}
