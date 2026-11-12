export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** A value translated in every supported locale. */
export type Localized<T = string> = Record<Locale, T>;
