import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, ArrowDown, Scissors, Gift, Star, Clock, MapPin } from "lucide-react";
import { ADDRESS, HOURS, MAPS_URL, bookingLinkProps, externalLinkProps } from "../config";
import { averageRating } from "../data/reviews";

const EASE = [0.16, 1, 0.3, 1] as const;
const TITLE = "КЛАССИКА";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] pt-16 lg:pt-20 flex items-center justify-center overflow-hidden bg-dark-900"
    >
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover scale-110"
        >
          <source src={`${import.meta.env.BASE_URL}hero-bg.mp4`} type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-dark-900/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900" />
      <div className="absolute inset-0 texture-overlay" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.a
            {...bookingLinkProps}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="group inline-flex items-center gap-2 px-4 py-1.5 glass-dark rounded-full mb-6 sm:mb-8 hover:bg-white/10 transition-colors"
          >
            <Gift className="w-3.5 h-3.5 text-gray-200" />
            <span className="text-xs tracking-wider text-white/80 group-hover:text-white transition-colors">
              Скидка 15% на первое посещение
            </span>
          </motion.a>

          <h1
            aria-label={TITLE}
            className="text-[clamp(2.75rem,11vw,8rem)] leading-none font-display font-bold tracking-[0.08em] text-white mb-6 flex overflow-hidden"
          >
            {TITLE.split("").map((letter, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.05, ease: EASE }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: EASE }}
            className="w-24 h-px bg-white/40 mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
            className="text-lg sm:text-xl text-white/80 font-light tracking-wider mb-4"
          >
            Мужские стрижки и уход в Краснодаре
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="text-sm sm:text-base text-white/50 max-w-xl leading-relaxed mb-10"
          >
            Современный барбершоп для мужчин, которые ценят качество, стиль и сервис.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a
              {...bookingLinkProps}
              className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-dark-900 bg-white hover:bg-gray-100 transition-all duration-500"
            >
              <span className="absolute inset-0 animate-shimmer [--shimmer-color:rgba(0,0,0,0.07)]" />
              <Calendar className="w-4 h-4 relative" />
              <span className="relative">Записаться онлайн</span>
            </a>
            <a
              href="#services"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium text-white/80 hover:text-white glass-dark hover:bg-white/10 transition-all duration-500"
            >
              <Scissors className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90" />
              <span>Услуги и цены</span>
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/60"
          >
            <li className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <span>
                <span className="text-white font-medium">{averageRating.toFixed(1)}</span> на Яндекс Картах
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{HOURS}</span>
            </li>
            <li>
              <a
                href={MAPS_URL}
                {...externalLinkProps}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{ADDRESS.replace("Краснодар, ", "")}</span>
              </a>
            </li>
          </motion.ul>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Прокрутить вниз"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300"
      >
        <span className="text-[10px] tracking-[0.3em]">ЛИСТАЙТЕ</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
