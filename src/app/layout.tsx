import type { Metadata } from "next";
import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Nav } from "@/components/layout/nav";


const garamond = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTM Command Center | Infrastructure as a Service",
  description: "Engineering applied to pipeline generation for complex markets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${garamond.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mono selection:bg-primary/30">
        <TooltipProvider>
          <Nav />
          <main className="flex-1 flex flex-col pt-[72px] overflow-x-hidden">
            {children}
          </main>
        </TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
