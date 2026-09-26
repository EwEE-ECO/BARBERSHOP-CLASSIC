import { useState, useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Modal from "./components/Modal";
import CookieConsent from "./components/CookieConsent";
import MobileBookingBar from "./components/MobileBookingBar";
import Marquee from "./components/Marquee";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import WhyUs from "./sections/WhyUs";
import Reviews from "./sections/Reviews";
import Process from "./sections/Process";
import CTA from "./sections/CTA";
import Contacts from "./sections/Contacts";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { PRIVACY_HASH } from "./config";

const PROMO_SEEN_KEY = "classica-promo-seen";
const PROMO_DELAY_MS = 12000;

function isPrivacyRoute() {
  return window.location.hash === PRIVACY_HASH;
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(isPrivacyRoute);

  const isPrivacyRef = useRef(isPrivacy);

  // Hash-based routing: works on GitHub Pages, survives reloads and supports the browser "Back" button.
  useEffect(() => {
    const onHashChange = () => {
      const next = isPrivacyRoute();
      const wasPrivacy = isPrivacyRef.current;
      isPrivacyRef.current = next;
      setIsPrivacy(next);

      if (next) {
        window.scrollTo(0, 0);
      } else if (wasPrivacy) {
        // Back on the main page: jump to the requested section once it has rendered.
        requestAnimationFrame(() => {
          const target = window.location.hash ? document.querySelector(window.location.hash) : null;
          if (target) target.scrollIntoView();
          else window.scrollTo(0, 0);
        });
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Show the promo once per browser session, and only on the main page.
  useEffect(() => {
    if (isPrivacy) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(PROMO_SEEN_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;

    const timer = setTimeout(() => {
      setModalOpen(true);
      try {
        sessionStorage.setItem(PROMO_SEEN_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    }, PROMO_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isPrivacy]);

  const goHome = () => {
    history.pushState(null, "", window.location.pathname + window.location.search);
    isPrivacyRef.current = false;
    setIsPrivacy(false);
    window.scrollTo(0, 0);
  };

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        {isPrivacy ? (
          <>
            <Helmet>
              <title>Политика конфиденциальности — Классика</title>
            </Helmet>
            <PrivacyPolicy onBack={goHome} />
          </>
        ) : (
          <>
            <Helmet>
              <title>Классика — Барбершоп в Краснодаре</title>
            </Helmet>

            <div className="min-h-screen bg-light">
              <Navbar />
              <main>
                <Hero />
                <Marquee />
                <About />
                <Services />
                <WhyUs />
                <Process />
                <Reviews />
                <CTA />
                <Contacts />
              </main>
              <Footer />
              <ScrollToTop />
              <MobileBookingBar />
              <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
              <CookieConsent />
            </div>
          </>
        )}
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;
