import { Navbar } from "~/components/Layout/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { Footer } from "~/components/Layout/Footer";
import { Layout } from "~/components/Layout/Layout";

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
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Layout>
          <div>{children}</div>
        </Layout>
        <Footer />
      </body>
    </html>
  );
}
