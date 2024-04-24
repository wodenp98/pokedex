import { Navbar } from "@/components/Layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";


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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo/pokeball.svg" sizes="36x36" />
      </head>
      <body className={`${inter.className}`}>
        <Navbar />
        <div className="pt-4">{children}</div>
      </body>
    </html>
  );
}
