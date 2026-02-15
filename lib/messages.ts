import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import fr from "@/messages/fr.json";
import hi from "@/messages/hi.json";
import ml from "@/messages/ml.json";
import type { Locale } from "./i18n";

export const messages = { en, ar, es, fr, hi, ml } as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}
