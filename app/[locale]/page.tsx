import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { isLocale } from "@/lib/i18n";
import { getMessages } from "@/lib/messages";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <PortfolioPage locale={locale} messages={getMessages(locale)} />;
}
