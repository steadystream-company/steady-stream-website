import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Steady Stream · 专业酒水供应链与品牌运营商",
    default: "Steady Stream | 专业酒水供应链与品牌运营商",
  },
  description:
    "Steady Stream 蔻斯科瓦，连接北欧与亚洲的精品酒水供应链，专注纯净品质与高效流通。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
