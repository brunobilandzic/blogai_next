// app/layout.js
// Root layout component that wraps the entire application

import "./globals.css";
import { Suspense } from "react";
import Providers from "../lib/providers";
import { Navbar } from "../components/UI/navbar";
import { LoadingMain } from "@/components/UI/loading";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 h-screen">
        <Suspense>
          <Providers>
            <Navbar />
            <LoadingMain>{children}</LoadingMain>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
