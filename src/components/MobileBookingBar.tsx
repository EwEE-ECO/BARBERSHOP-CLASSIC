import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Phone } from "lucide-react";
import { PHONE_HREF, bookingLinkProps } from "../config";

/** Sticky call/book bar for phones — appears once the hero is scrolled past. */
export default function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/90 backdrop-blur-md border-t border-dark-900/5"
        >
          <div className="flex gap-2">
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center w-12 shrink-0 border border-dark-900/10 text-dark-900"
              aria-label="Позвонить"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              {...bookingLinkProps}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 text-sm font-medium text-white bg-dark-900 active:bg-dark-700"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться · −15% первый визит</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
