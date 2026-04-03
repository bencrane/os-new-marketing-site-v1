import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { wineAndSpiritsConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: wineAndSpiritsConfig.metaTitle,
  description: wineAndSpiritsConfig.metaDescription,
};

export default function WineAndSpiritsPage() {
  return <VerticalTemplate data={wineAndSpiritsConfig} />;
}
