import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { realEstateConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: realEstateConfig.metaTitle,
  description: realEstateConfig.metaDescription,
};

export default function RealEstateVertical() {
  return <VerticalTemplate data={realEstateConfig} />;
}
