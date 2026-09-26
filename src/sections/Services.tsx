import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookingLinkProps } from "../config";
import PriceCard from "../components/PriceCard";
import { services } from "../data/services";

const categories = [
  { id: "all", label: "Все" },
  { id: "стрижки", label: "Стрижки" },
  { id: "борода", label: "Борода" },
  { id: "комбо", label: "Комбо" },
  { id: "уход", label: "Уход" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-20 sm:py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-900 tracking-tight mb-4">
            Наши услуги
          </h2>
          <p className="text-sm text-dark-600 max-w-xl mx-auto">
            Премиальные услуги для мужчин, ценящих качество и стиль
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              className={`relative px-5 py-2 text-xs tracking-wider border transition-colors duration-300 ${
                activeCategory === cat.id
                  ? "text-white font-medium border-dark-900"
                  : "text-dark-600 hover:text-dark-900 bg-light border-dark-900/5 hover:border-dark-900/20"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="services-tab"
                  className="absolute inset-0 bg-dark-900"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">
                {cat.label}
                <span className="ml-1.5 opacity-50">
                  {cat.id === "all"
                    ? services.length
                    : services.filter((s) => s.category === cat.id).length}
                </span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((service, i) => (
              <PriceCard key={service.id} service={service} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            {...bookingLinkProps}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white bg-dark-900 hover:bg-dark-700 transition-all duration-500"
          >
            Записаться со скидкой 15%
          </a>
        </motion.div>
      </div>
    </section>
  );
}
