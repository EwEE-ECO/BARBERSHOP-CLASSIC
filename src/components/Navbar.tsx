import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Menu, X, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_HREF, bookingLinkProps } from "../config";

const navLinks = [
  { label: "О нас", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = navLinks.map((l) => l.href.slice(1));

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(sectionIds);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const solid = scrolled || mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-white/90 backdrop-blur-md border-b border-dark-900/5 shadow-card"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Основная навигация">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-16 lg:h-20"
          }`}
        >
          <a href="#" className="flex items-center gap-2 group" aria-label="Классика — наверх">
            <Scissors
              className={`w-5 h-5 group-hover:rotate-90 transition-all duration-500 ${
                solid ? "text-dark-700" : "text-white/80"
              }`}
            />
            <span
              className={`text-lg font-display font-bold tracking-widest transition-colors duration-500 ${
                solid ? "text-dark-900" : "text-white"
              }`}
            >
              КЛАССИКА
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm tracking-wide py-1 transition-colors duration-300 ${
                    solid
                      ? isActive
                        ? "text-dark-900"
                        : "text-dark-600 hover:text-dark-900"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && solid && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-0.5 h-px bg-dark-900"
                    />
                  )}
                </a>
              );
            })}
            <a
              href={PHONE_HREF}
              className={`flex items-center gap-2 text-sm tracking-wide transition-colors duration-300 ${
                solid ? "text-dark-900" : "text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              {PHONE_DISPLAY}
            </a>
            <a
              {...bookingLinkProps}
              className={`px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                solid
                  ? "text-white bg-dark-900 hover:bg-dark-700"
                  : "text-dark-900 bg-white hover:bg-gray-200"
              }`}
            >
              Записаться
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 transition-colors ${
              solid ? "text-dark-700 hover:text-dark-900" : "text-white"
            }`}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white border-t border-dark-900/5"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="block text-2xl font-display text-dark-900 py-2"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 text-sm text-dark-600 pt-4 pb-2"
              >
                <Phone className="w-4 h-4" />
                {PHONE_DISPLAY}
              </a>
              <a
                {...bookingLinkProps}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3.5 text-sm font-medium text-white bg-dark-900 hover:bg-dark-700 transition-colors tracking-wide"
              >
                Записаться онлайн
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
