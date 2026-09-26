import { Scissors, Phone, MapPin, Calendar, ArrowUpRight, Send, Clock } from "lucide-react";
import {
  ADDRESS,
  HOURS,
  MAPS_URL,
  MAX_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  PRIVACY_HASH,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
  bookingLinkProps,
  externalLinkProps,
} from "../config";

const footerLinks = [
  { label: "Услуги", href: "#services" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
];

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 group">
              <Scissors className="w-5 h-5 text-gray-200" />
              <span className="text-lg font-display font-bold tracking-widest text-white">
                КЛАССИКА
              </span>
            </a>
            <p className="text-sm text-white/50 leading-relaxed">
              Мужские стрижки. Борода. Уход. Без лишнего.
            </p>
            <div className="flex items-center gap-1 text-sm text-white/50">
              <span>Рейтинг</span>
              <span className="text-gray-200" aria-label="5 из 5">★★★★★</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 tracking-wider mb-4">
              НАВИГАЦИЯ
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={PRIVACY_HASH}
                  className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 tracking-wider mb-4">
              КОНТАКТЫ
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={MAPS_URL}
                  {...externalLinkProps}
                  className="flex items-start gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-200" />
                  <span>{ADDRESS}</span>
                </a>
              </li>
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 shrink-0 text-gray-200" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  {...externalLinkProps}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Send className="w-4 h-4 shrink-0 text-gray-200" />
                  <span>{TELEGRAM_HANDLE}</span>
                </a>
              </li>
              <li>
                <a
                  href={MAX_URL}
                  {...externalLinkProps}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <img src="https://maxicons.ru/icons/Max_logo.svg" alt="" loading="lazy" className="w-4 h-4 shrink-0" />
                  <span>Max</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 tracking-wider mb-4">
              ЗАПИСЬ
            </h4>
            <a
              {...bookingLinkProps}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-dark-900 bg-gray-200 hover:bg-white hover:text-dark-900 transition-all duration-300 group"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться онлайн</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="flex items-center gap-2 mt-5 text-sm text-white/50">
              <Clock className="w-4 h-4 text-gray-200" />
              {HOURS}
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Барбершоп «Классика». Все права защищены.</p>
          <div className="flex items-center gap-4">
            <a
              href={PRIVACY_HASH}
              className="hover:text-white transition-colors"
            >
              Политика конфиденциальности
            </a>
            <span className="hidden sm:inline">Краснодар</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
