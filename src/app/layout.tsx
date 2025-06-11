import type { Metadata } from "next";
import { geistMono, geistSans } from "@/config/fonts";
import "./globals.css";



export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | shop',
    default: 'Home - Teslo | shop'
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
