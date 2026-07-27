import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CoGen Labs — Engineering the AI Layer of Modern Business",
  description:
    "CoGen Labs designs, builds and operates AI systems, agents and cloud infrastructure for serious businesses.",
  authors: [{ name: "CoGen Labs" }],
  openGraph: {
    title: "CoGen Labs — AI Engineering, Done Right",
    description:
      "AI systems, agents, workflow automation and cloud infrastructure engineered for enterprise scale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@cogenlabs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
