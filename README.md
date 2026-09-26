# Барбершоп «Классика» — сайт

Одностраничный сайт барбершопа «Классика» (Краснодар, Ростовское шоссе, 30/7к1).

**Стек:** React 19, TypeScript, Vite, Tailwind CSS 4, Framer Motion.

## Запуск

```bash
npm install
npm run dev      # локальный сервер разработки
npm run lint     # проверка ESLint
npm run build    # production-сборка в dist/
npm run preview  # просмотр production-сборки
```

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, адрес, часы работы, ссылки на запись/мессенджеры | `src/config.ts` |
| Услуги и цены | `src/data/services.ts` |
| Отзывы | `src/data/reviews.ts` |
| Цвета и шрифты | `src/index.css` (`@theme`) |
| Видео на фоне | `public/hero-bg.mp4`, `public/about-photo.mp4` |

Политика конфиденциальности открывается по адресу `…/#privacy-policy`.

## Деплой

Push в `master` запускает GitHub Actions (`.github/workflows/deploy.yml`), который собирает сайт и публикует его на GitHub Pages. Базовый путь задан в `vite.config.ts` (`base: '/BARBERSHOP-CLASSIC/'`).
