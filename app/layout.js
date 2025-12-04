// app/layout.js
// Root layout component that wraps the entire application

import "./globals.css";
import { Suspense } from "react";
import Providers from "../lib/providers";
import { Navbar } from "../components/UI/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 h-screen">
        <Suspense>
          <Providers>
            <Navbar />
            <main className="main mx-auto pb-8">{children}</main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
