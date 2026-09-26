import { Scissors } from "lucide-react";

const items = [
  "Мужские стрижки",
  "Моделирование бороды",
  "Бритьё головы",
  "Тонирование седины",
  "Уход за лицом",
  "Отец и сын",
  "Укладка",
  "Ваксинг",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <span className="px-6 sm:px-8 text-sm sm:text-base font-display tracking-[0.2em] uppercase text-white/80 whitespace-nowrap">
            {item}
          </span>
          <Scissors className="w-3.5 h-3.5 text-white/30 -rotate-90" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden bg-dark-900 border-y border-white/5 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
