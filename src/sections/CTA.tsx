import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { bookingLinkProps } from "../config";

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-dark-900">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 texture-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-white tracking-tight mb-6">
            Готовы обновить образ?
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
            Запишитесь на первое посещение со скидкой 15% и оцените премиальный сервис
            барбершопа «Классика»
          </p>
          <a
            {...bookingLinkProps}
            className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-dark-900 bg-white hover:bg-gray-200 transition-all duration-500"
          >
            <Calendar className="w-4 h-4" />
            <span>Записаться онлайн</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
