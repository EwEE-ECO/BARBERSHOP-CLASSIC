import { motion } from "framer-motion";
import { Star, Quote, ArrowUpRight } from "lucide-react";
import { reviews, averageRating as avgRating } from "../data/reviews";
import { MAPS_URL, bookingLinkProps, externalLinkProps } from "../config";
import CountUp from "../components/CountUp";

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-20 sm:py-28 lg:py-36 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="text-6xl font-display font-bold text-dark-900 tabular-nums">
              <CountUp end={avgRating} duration={2} decimals={1} />
            </span>
            <div className="flex flex-col items-start">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        i < Math.round(avgRating)
                          ? "text-dark-900 fill-dark-900"
                          : "text-dark-900/20"
                      }`}
                    />
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
                className="text-xs text-dark-600 mt-1"
              >
                На основе {reviews.length} отзывов с Яндекс Карт
              </motion.span>
            </div>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-900 tracking-tight">
            Отзывы наших гостей
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -4 }}
            >
              <figure className="bg-white border border-dark-900/5 rounded-sm p-6 h-full flex flex-col hover:border-dark-900/20 hover:shadow-premium transition-all duration-500">
                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Quote className="w-6 h-6 text-dark-900/20 mb-4" />
                </motion.div>
                <blockquote className="text-sm text-dark-600 leading-relaxed mb-5 flex-1">
                  {review.text}
                </blockquote>
                <figcaption className="flex items-center justify-between gap-3 pt-4 border-t border-dark-900/5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-full bg-dark-900 text-white text-xs font-medium flex items-center justify-center shrink-0">
                      {review.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-dark-900 truncate">{review.name}</p>
                      <p className="text-xs text-dark-600">
                        {new Date(review.date).toLocaleDateString("ru-RU", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 shrink-0" aria-label={`Оценка ${review.rating} из 5`}>
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-3 h-3 text-dark-900 fill-dark-900" />
                      </motion.span>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <motion.a
            {...bookingLinkProps}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white bg-dark-900 hover:bg-dark-700 transition-all duration-500"
          >
            Получить скидку 15%
          </motion.a>
          <a
            href={MAPS_URL}
            {...externalLinkProps}
            className="group inline-flex items-center gap-2 px-6 py-4 text-sm text-dark-700 hover:text-dark-900 transition-colors"
          >
            Все отзывы на Яндекс Картах
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
