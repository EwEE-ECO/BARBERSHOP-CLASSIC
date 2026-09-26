import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Gift, Check, Star } from "lucide-react";
import { averageRating } from "../data/reviews";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Video framed like a gallery piece: offset solid block, outline frame, floating badges and a mouse tilt. */
function AboutVideo({ isVisible }: { isVisible: boolean }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 20 });
  const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const glare = useTransform(
    glareX,
    (x) => `radial-gradient(circle at ${x} 20%, rgba(255,255,255,0.18), transparent 55%)`
  );

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="relative isolate mx-auto max-w-md lg:max-w-none px-4 sm:px-8 py-6 sm:py-10 [perspective:1200px]"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Solid offset block */}
      <motion.div
        aria-hidden="true"
        className="absolute top-12 sm:top-16 right-0 bottom-0 left-10 sm:left-16 bg-dark-900 rounded-sm -z-10"
        initial={{ opacity: 0, x: -30, y: -30 }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
      >
        <div className="absolute inset-0 texture-overlay" />
      </motion.div>

      {/* Outline frame, offset the other way */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 w-2/3 h-2/3 border border-dark-900/20 rounded-sm -z-10"
        initial={{ opacity: 0, x: 30, y: 30 }}
        animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.65, ease: EASE }}
      />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <motion.div
          className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={isVisible ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
        >
          <motion.video
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="w-full h-full object-cover"
            initial={{ scale: 1.25 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: EASE }}
          >
            <source src={`${import.meta.env.BASE_URL}about-photo.mp4`} type="video/mp4" />
          </motion.video>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 via-transparent to-dark-900/10" />
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: glare }} />
          {/* Inner hairline frame */}
          <div className="absolute inset-3 sm:inset-4 border border-white/25 rounded-sm pointer-events-none" />
        </motion.div>

        {/* Top-right "live" tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
          style={{ translateZ: 40 }}
          className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center gap-2 px-3 py-1.5 glass-dark rounded-full"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-red-500 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-red-500" />
          </span>
          <span className="text-[10px] tracking-[0.2em] text-white/90">ПРОЦЕСС</span>
        </motion.div>

        {/* Bottom caption inside the frame */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
          className="absolute bottom-7 right-7 sm:bottom-9 sm:right-9 text-right pointer-events-none"
        >
          <p className="font-display text-white text-xl sm:text-2xl leading-tight">Внимание к деталям</p>
          <p className="text-[10px] tracking-[0.25em] text-white/60 mt-1">КРАСНОДАР</p>
        </motion.div>

        {/* Floating rating card, overlapping the frame edge */}
        <motion.div
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          style={{ translateZ: 60 }}
          className="absolute -left-2 sm:-left-8 top-1/2 bg-white rounded-sm px-5 py-4 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3)]"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="font-display text-3xl font-bold text-dark-900 leading-none">
              {averageRating.toFixed(1)}
            </p>
            <div className="flex gap-0.5 mt-1.5" aria-label={`Рейтинг ${averageRating.toFixed(1)} из 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 text-dark-900 fill-dark-900" />
              ))}
            </div>
            <p className="text-[10px] text-dark-600 mt-1.5 tracking-wide">Яндекс Карты</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    "Опытные мастера",
    "Премиальная косметика",
    "Уютная атмосфера",
    "Индивидуальный подход",
  ];

  return (
    <section id="about" className="relative overflow-x-clip py-20 sm:py-28 lg:py-36 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-900 tracking-tight mb-6"
            >
              О нас
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-dark-600 leading-relaxed mb-8"
            >
              Классика — это пространство для мужчин, где каждая услуга выполняется с
              вниманием к деталям. Мы объединяем современные техники, качественную
              косметику и высокий уровень сервиса.
            </motion.p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                  className="flex items-center gap-2.5 text-sm text-dark-700"
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-dark-900 shrink-0"
                    animate={isVisible ? { scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                  />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -2 }}
              className="bg-white border border-dark-900/5 rounded-sm p-6 shadow-premium"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-10 h-10 rounded-full bg-dark-900 flex items-center justify-center shrink-0"
                  animate={isVisible ? { rotate: [0, 10, 0] } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Gift className="w-4 h-4 text-white" />
                </motion.div>
                <div>
                  <h4 className="text-base font-medium text-dark-900 mb-1">
                    -15% на первое посещение
                  </h4>
                  <ul className="space-y-1">
                    {[
                      "Скидка 15% на все услуги, кроме комплексных",
                      "Массаж головы в подарок к стрижке",
                      "Депиляция 1 зоны (уши/нос/брови) в подарок",
                    ].map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                        className="flex items-center gap-2 text-xs text-dark-600"
                      >
                        <motion.span
                          animate={isVisible ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                        >
                          <Check className="w-3 h-3 text-dark-700" />
                        </motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <AboutVideo isVisible={isVisible} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
