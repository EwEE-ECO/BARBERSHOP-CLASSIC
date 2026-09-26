import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Service } from "../data/services";
import { bookingLinkProps } from "../config";

interface PriceCardProps {
  service: Service;
  index: number;
}

export default function PriceCard({ service, index }: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <div className="bg-white border border-dark-900/5 rounded-sm p-6 h-full flex flex-col hover:border-dark-900/20 hover:shadow-premium transition-all duration-500">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-base font-medium text-dark-900 group-hover:text-dark-700 transition-colors duration-300">
            {service.title}
          </h3>
          <span className="text-base font-semibold text-dark-700 whitespace-nowrap">
            {service.price} ₽
          </span>
        </div>

        <p className="text-sm text-dark-600 leading-relaxed mb-5 flex-1">
          {service.description}
        </p>

        <a
          {...bookingLinkProps}
          aria-label={`Записаться: ${service.title}`}
          className="inline-flex items-center gap-2 text-xs font-medium text-dark-700 hover:text-dark-900 transition-colors duration-300 group/link"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Записаться</span>
        </a>
      </div>
    </motion.div>
  );
}
