import { motion } from "framer-motion";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { Gift, Check } from "lucide-react";

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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isVisible ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={`${import.meta.env.BASE_URL}about-photo.mp4`} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/30 to-transparent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-6 -left-6 w-48 h-48 border border-dark-900/10 rounded-sm -z-10 hidden sm:block"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
