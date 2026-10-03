import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMusic } from './context/MusicContext';
import OpeningScreen from './components/OpeningScreen';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import HeroSection from './sections/HeroSection';
import CoupleSection from './sections/CoupleSection';
import StorySection from './sections/StorySection';
import FamilySection from './sections/FamilySection';
import EventsSection from './sections/EventsSection';
import CountdownSection from './sections/CountdownSection';
import WeddingDetails from './sections/WeddingDetails';
import VenueSection from './sections/VenueSection';
import BlessingsSection from './sections/BlessingsSection';
import ThankYouSection from './sections/ThankYouSection';
import Footer from './sections/Footer';

export default function App() {
  const [entered, setEntered] = useState(false);
  const { start } = useMusic();

  // No scrolling behind the opening screen.
  useEffect(() => {
    document.documentElement.style.overflow = entered ? '' : 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [entered]);

  const enter = useCallback(() => {
    start(); // must run inside the click → browsers allow audio after a user gesture
    window.scrollTo(0, 0);
    setEntered(true);
  }, [start]);

  return (
    <>
      <AnimatePresence>{!entered && <OpeningScreen key="opening" onEnter={enter} />}</AnimatePresence>

      {entered && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <CoupleSection />
            <StorySection />
            <FamilySection />
            <EventsSection />
            <CountdownSection />
            <WeddingDetails />
          
            <VenueSection />
          
            
            <BlessingsSection />
            <ThankYouSection />
          </main>
          <Footer />
          <MusicPlayer />
        </>
      )}
    </>
  );
}
