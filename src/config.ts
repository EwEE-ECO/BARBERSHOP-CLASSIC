export const BOOKING_URL = "https://n1972733.yclients.com";
export const PHONE_DISPLAY = "+7 (918) 128-08-65";
export const PHONE_HREF = "tel:+79181280865";
export const ADDRESS = "Краснодар, Ростовское шоссе, 30/7к1";
export const MAPS_URL = "https://yandex.ru/maps/-/CPXuZIZp";
export const TELEGRAM_URL = "https://t.me/classic_br";
export const TELEGRAM_HANDLE = "@classic_br";
export const MAX_URL =
  "https://max.ru/u/f9LHodD0cOICiE22JFKFeGecTPGF0p8j0P2U_Z-X7HXCKy9aOQ7VX2xqlJQ";
export const HOURS = "Ежедневно 9:00 – 21:00";

export const PRIVACY_HASH = "#privacy-policy";

/** Props for every "book online" link: opens YCLIENTS in a new tab safely. */
export const bookingLinkProps = {
  href: BOOKING_URL,
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
