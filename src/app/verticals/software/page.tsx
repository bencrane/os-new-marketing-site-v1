import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { softwareConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: softwareConfig.metaTitle,
  description: softwareConfig.metaDescription,
};

export default function SoftwarePage() {
  return <VerticalTemplate data={softwareConfig} />;
}
