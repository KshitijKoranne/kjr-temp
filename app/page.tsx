import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Work from "@/components/Work";
import BeforeAfter from "@/components/BeforeAfter";
import Principles from "@/components/Principles";
import Quality from "@/components/Quality";
import AI from "@/components/AI";
import Periodic from "@/components/Periodic";
import Makers from "@/components/Makers";
import Process from "@/components/Process";
import Estimator from "@/components/Estimator";
// Testimonials stay off until there are real reviews: import Testimonials from "@/components/Testimonials";
import Since from "@/components/Since";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Manifesto />
      <Services />
      <Work />
      <BeforeAfter />
      <Principles />
      <Quality />
      <AI />
      <Periodic />
      <Makers />
      <Process />
      <Estimator />
      {/* <Testimonials /> */}
      <Since />
      <FAQ />
      <CTA />
      <Contact />
      <Location />
    </>
  );
}
