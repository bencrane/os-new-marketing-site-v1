import { Metadata } from "next";
import { VerticalTemplate } from "@/components/verticals/vertical-template";
import { factoringConfig } from "@/config/verticals";

export const metadata: Metadata = {
  title: factoringConfig.metaTitle,
  description: factoringConfig.metaDescription,
};

export default function FactoringPage() {
  return <VerticalTemplate data={factoringConfig} />;
}
