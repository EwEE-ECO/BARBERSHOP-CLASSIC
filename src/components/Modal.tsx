import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, ArrowRight, Check } from "lucide-react";
import { bookingLinkProps } from "../config";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const perks = [
  "−15% на все услуги, кроме комплексных",
  "Массаж головы в подарок к стрижке",
  "Депиляция 1 зоны в подарок",
];

export default function Modal({ isOpen, onClose }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md"
          >
            <div className="relative overflow-hidden bg-white rounded-sm shadow-premium">
              <div className="relative bg-dark-900 px-8 pt-10 pb-8 text-center overflow-hidden">
                <div className="absolute inset-0 texture-overlay" />
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <motion.div
                  initial={{ rotate: -20, scale: 0.6 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.15 }}
                  className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center mx-auto mb-4"
                >
                  <Gift className="w-6 h-6 text-dark-900" />
                </motion.div>
                <p className="relative font-display text-6xl font-bold text-white leading-none">
                  −15%
                </p>
                <p className="relative text-xs tracking-[0.25em] text-white/50 mt-2">
                  НА ПЕРВЫЙ ВИЗИТ
                </p>
              </div>

              <button
                ref={closeRef}
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 text-white/60 hover:text-white transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 text-center">
                <h3 id="promo-title" className="text-xl font-semibold text-dark-900 mb-4">
                  Ваш первый визит со скидкой
                </h3>
                <ul className="space-y-2 mb-8 text-left inline-block">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-sm text-dark-600">
                      <Check className="w-3.5 h-3.5 text-dark-900 shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <a
                    {...bookingLinkProps}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-dark-900 hover:bg-dark-700 transition-all duration-300 group"
                    onClick={onClose}
                  >
                    <span>Записаться со скидкой</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <button
                    onClick={onClose}
                    className="w-full px-6 py-3 text-sm text-dark-600 hover:text-dark-900 transition-colors"
                  >
                    Позже
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
