import { Navbar } from "@/components/Layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex",
  description: "Created by Wdn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Navbar />
        <div className="pt-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
