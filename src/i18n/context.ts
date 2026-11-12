import { createContext, useContext } from "react";
import type { Dict } from "./fr";
import type { Locale, Localized } from "./types";

export interface I18nValue {
  locale: Locale;
  t: Dict;
  setLocale: (locale: Locale) => void;
  /** Pick the right translation from a Localized value. */
  pick: <T>(value: Localized<T>) => T;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}
