import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { insuranceConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: insuranceConfig.metaTitle,
  description: insuranceConfig.metaDescription,
};

export default function InsurancePage() {
  return <VerticalTemplate data={insuranceConfig} />;
}
