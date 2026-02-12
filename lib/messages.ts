import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import type { Locale } from "./i18n";

export const messages = { en, ar } as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
