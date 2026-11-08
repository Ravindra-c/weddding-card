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
import GallerySection from './sections/GallerySection';
import VenueSection from './sections/VenueSection';
//import RSVPSection from './sections/RSVPSection';
//import ShareSection from './sections/ShareSection';
import BlessingsSection from './sections/BlessingsSection';
import ThankYouSection from './sections/ThankYouSection';
import Footer from './sections/Footer';

/** How long the opening (blessing) screen stays before the website opens by itself. */
const OPENING_DURATION_MS = 5000;

export default function App() {
  const [entered, setEntered] = useState(false);
  const [showOpening, setShowOpening] = useState(true); // forced to false shortly after entering
  const { start, status } = useMusic();
  const timers = useRef([]);
  const statusRef = useRef(status);
  statusRef.current = status;
  const unlockTried = useRef(false);

  // No scrolling behind the opening screen; always unlock afterwards.
  useEffect(() => {
    document.documentElement.style.overflow = entered ? '' : 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, [entered]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const enter = useCallback(() => {
    start(); // tries to play music; browsers may block it until the guest touches the page (handled below)
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

  // Open the website automatically after the opening screen has been shown.
  useEffect(() => {
    const id = setTimeout(enter, OPENING_DURATION_MS);
    return () => clearTimeout(id);
  }, [enter]);

  // Browsers block music that starts without a tap. If that happened, start it on the
  // guest's first tap / key press on the page (taps on buttons and links handle themselves).
  useEffect(() => {
    if (!entered) return undefined;
    const events = ['pointerup', 'touchend', 'keydown'];
    const remove = () => events.forEach((e) => window.removeEventListener(e, kick));
    function kick(e) {
      if (unlockTried.current) return;
      if (statusRef.current === 'playing') { unlockTried.current = true; remove(); return; }
      if (e.target?.closest?.('button, a')) return; // music button / links work on their own
      unlockTried.current = true;
      remove();
      start();
    }
    events.forEach((e) => window.addEventListener(e, kick, { passive: true }));
    return remove;
  }, [entered, start]);

  return (
    <>
      {showOpening && (
        <AnimatePresence>{!entered && <OpeningScreen key="opening" />}</AnimatePresence>
      )}

      {entered && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <CoupleSection />
            <StorySection />
            <FamilySection />
            <GallerySection />
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