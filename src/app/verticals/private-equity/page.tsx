import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { privateEquityConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: privateEquityConfig.metaTitle,
  description: privateEquityConfig.metaDescription,
};

export default function PrivateEquityPage() {
  return <VerticalTemplate data={privateEquityConfig} />;
}
