import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { PRIVACY_HASH } from "../config";

const COOKIE_CONSENT_KEY = "classica-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      /* storage unavailable */
    }
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    } catch {
      /* storage unavailable */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 sm:p-6"
          role="region"
          aria-label="Уведомление о cookie"
        >
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-sm p-5 sm:p-6 shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-10 h-10 rounded-full bg-dark-900 items-center justify-center shrink-0 mt-0.5">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-dark-900 mb-1">
                        Файлы cookie
                      </h4>
                      <p className="text-xs sm:text-sm text-dark-600 leading-relaxed max-w-2xl">
                        Для работы сайта используются технические файлы cookie.
                        Продолжая использовать сайт, вы соглашаетесь с этим.
                      </p>
                    </div>
                    <button
                      onClick={() => setVisible(false)}
                      className="p-1 text-dark-600 hover:text-dark-900 transition-colors shrink-0"
                      aria-label="Закрыть"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <button
                      onClick={accept}
                      className="px-5 py-2 text-xs font-medium text-white bg-dark-900 hover:bg-dark-700 transition-colors"
                    >
                      Принять
                    </button>
                    <a
                      href={PRIVACY_HASH}
                      className="text-xs text-dark-600 underline underline-offset-2 hover:text-dark-900 transition-colors"
                      onClick={() => setVisible(false)}
                    >
                      Политика конфиденциальности
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
