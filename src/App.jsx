import { useCallback, useEffect, useRef, useState } from 'react';
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
//import GallerySection from './sections/GallerySection';
import VenueSection from './sections/VenueSection';
//import RSVPSection from './sections/RSVPSection';
//import ShareSection from './sections/ShareSection';
import BlessingsSection from './sections/BlessingsSection';
import ThankYouSection from './sections/ThankYouSection';
import Footer from './sections/Footer';

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showOpening, setShowOpening] = useState(true); // forced to false shortly after entering
  const { start } = useMusic();
  const timers = useRef([]);

  // No scrolling behind the opening screen; always unlock afterwards.
  useEffect(() => {
    document.documentElement.style.overflow = entered ? '' : 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [entered]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const enter = useCallback(() => {
    start(); // must run inside the click → browsers allow audio after a user gesture
    window.scrollTo(0, 0);
    setEntered(true);
    // Safety net: even if the exit animation hangs, remove the opening screen and unlock scrolling.
    timers.current.push(
      setTimeout(() => {
        setShowOpening(false);
        document.documentElement.style.overflow = '';
      }, 1800)
    );
  }, [start]);

  return (
    <>
      {showOpening && (
        <AnimatePresence>{!entered && <OpeningScreen key="opening" onEnter={enter} />}</AnimatePresence>
      )}

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