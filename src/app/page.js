import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import PopularCourses from './components/sections/PopularCourses';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Testimonials from './components/sections/Testimonials';
import CTA from './components/sections/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <PopularCourses />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </main>
  );
}