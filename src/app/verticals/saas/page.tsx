import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { saasConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: saasConfig.metaTitle,
  description: saasConfig.metaDescription,
};

export default function SaaSPage() {
  return <VerticalTemplate data={saasConfig} />;
}
