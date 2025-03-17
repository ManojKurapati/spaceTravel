import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationSelector from '@/components/DestinationSelector';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import ExperiencePackages from '@/components/ExperiencePackages';
import AIConcierge from '@/components/AIConcierge';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <DestinationSelector />
      <FeaturedDestinations />
      <ExperiencePackages />
      <AIConcierge />
      <Footer />
    </>
  );
};

export default Home;
