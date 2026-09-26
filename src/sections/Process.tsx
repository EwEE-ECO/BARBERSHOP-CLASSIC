import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Scissors, Sparkles, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Консультация",
    description: "Обсуждаем пожелания, подбираем стрижку под форму лица и тип волос.",
  },
  {
    icon: Scissors,
    title: "Стрижка",
    description: "Профессиональная работа с использованием премиальных инструментов.",
  },
  {
    icon: Sparkles,
    title: "Укладка",
    description: "Финишная укладка с профессиональной косметикой для идеального вида.",
  },
  {
    icon: CheckCircle,
    title: "Результат",
    description: "Вы получаете безупречный образ и рекомендации по уходу.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-white overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-dark-900 tracking-tight mb-4">
            Как мы работаем
          </h2>
          <p className="text-sm text-dark-600 max-w-xl mx-auto">
            От первой консультации до финального результата
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px origin-left"
            style={{ scaleX: lineScale }}
          >
            <div className="w-full h-full bg-gradient-to-r from-dark-900/10 via-dark-900/40 to-dark-900/10" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative flex flex-col items-center text-center group"
                >
                  <motion.div
                    className="relative z-10 mb-6 rounded-full ring-8 ring-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-dark-900 flex items-center justify-center group-hover:bg-dark-700 transition-all duration-500">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-dark-900/10 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-[10px] font-medium text-dark-700">
                        {i + 1}
                      </span>
                    </motion.div>
                  </motion.div>

                  <h3 className="text-base font-medium text-dark-900 mb-2 group-hover:text-dark-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-dark-600 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
