import { PortfolioPage } from "@/components/portfolio-page";
import { getMessages } from "@/lib/messages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Fit Check",
  description:
    "Hiring? Answer a short questionnaire about your role and get an honest, instant match against Vishnuraj Rajagopal's preferences — then send the role over in one click.",
  alternates: { canonical: "/hire-me" },
  openGraph: {
    title: "Role Fit Check — Vishnuraj Rajagopal",
    description:
      "Answer a short questionnaire and get an honest match verdict against Vishnuraj's hiring preferences.",
  },
};

export default function HireMePage() {
  return (
    <div lang="en" dir="ltr" data-locale="en">
      <div className="crt-overlay" aria-hidden="true" />
      <PortfolioPage locale="en" messages={getMessages("en")} autoOpenRoleFit />
    </div>
  );
}
