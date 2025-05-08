import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers"; // Yeni oluşturduğumuz Providers'ı içe aktarın


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JOB TS",
  description: "Job Tracking System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#eaf8fa", color: "#111111" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>

          <div className="h-screen" style={{ backgroundColor: "#ffffff", color: "#111111" }}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
