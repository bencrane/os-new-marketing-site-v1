import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { verticalSaasConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: verticalSaasConfig.metaTitle,
  description: verticalSaasConfig.metaDescription,
};

export default function VerticalSaasPage() {
  return <VerticalTemplate data={verticalSaasConfig} />;
}
