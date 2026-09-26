import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { MapPin, Phone, Calendar, ArrowUpRight, Send, Clock } from "lucide-react";
import {
  ADDRESS,
  HOURS,
  MAPS_URL,
  MAX_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
  bookingLinkProps,
  externalLinkProps,
} from "../config";

interface ContactItemProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function ContactItem({ icon, title, children }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-11 h-11 rounded-sm bg-dark-900 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:-rotate-6">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-dark-900 mb-1">{title}</h3>
        <div className="text-sm text-dark-600">{children}</div>
      </div>
    </div>
  );
}

const linkClass = "hover:text-dark-900 transition-colors underline-offset-4 hover:underline";

export default function Contacts() {
  return (
    <section id="contacts" className="relative overflow-x-clip py-20 sm:py-28 lg:py-36 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-900 tracking-tight mb-4">
            Контакты
          </h2>
          <p className="text-sm text-dark-600">Всегда на связи и ждём вас в гости</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactItem icon={<MapPin className="w-5 h-5 text-white" />} title="Адрес">
                <a href={MAPS_URL} {...externalLinkProps} className={linkClass}>
                  {ADDRESS}
                </a>
              </ContactItem>

              <ContactItem icon={<Clock className="w-5 h-5 text-white" />} title="Часы работы">
                {HOURS}
              </ContactItem>

              <ContactItem icon={<Phone className="w-5 h-5 text-white" />} title="Телефон">
                <a href={PHONE_HREF} className={linkClass}>
                  {PHONE_DISPLAY}
                </a>
              </ContactItem>

              <ContactItem icon={<Send className="w-5 h-5 text-white" />} title="Telegram">
                <a href={TELEGRAM_URL} {...externalLinkProps} className={linkClass}>
                  {TELEGRAM_HANDLE}
                </a>
              </ContactItem>

              <ContactItem
                icon={
                  <img
                    src="https://maxicons.ru/icons/Max_logo.svg"
                    alt=""
                    loading="lazy"
                    className="w-5 h-5"
                  />
                }
                title="Max"
              >
                <a href={MAX_URL} {...externalLinkProps} className={linkClass}>
                  Перейти в профиль
                </a>
              </ContactItem>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                {...bookingLinkProps}
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-dark-900 hover:bg-dark-700 transition-all duration-500"
              >
                <Calendar className="w-4 h-4" />
                <span>Записаться со скидкой 15%</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={PHONE_HREF}
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm text-dark-700 hover:text-dark-900 bg-white border border-dark-900/10 hover:border-dark-900/30 transition-all duration-500"
              >
                <Phone className="w-4 h-4" />
                <span>Позвонить</span>
              </a>
              <a
                href={MAPS_URL}
                {...externalLinkProps}
                className="group inline-flex items-center gap-2 px-6 py-3.5 text-sm text-dark-700 hover:text-dark-900 bg-white border border-dark-900/10 hover:border-dark-900/30 transition-all duration-500"
              >
                <MapPin className="w-4 h-4" />
                <span>Построить маршрут</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="h-[320px] lg:h-full lg:min-h-[420px] rounded-sm overflow-hidden border border-dark-900/5 shadow-premium grayscale-[35%] hover:grayscale-0 transition-[filter] duration-700"
          >
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=38.999697%2C45.101216&z=17&pt=38.999697,45.101216,pm2dvl&l=map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Карта — Барбершоп Классика"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
