// app/layout.js
// Root layout component that wraps the entire application

import "./globals.css";
import { Suspense } from "react";
import Providers from "../lib/providers";
import { Navbar } from "../components/navbar/main";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 h-screen">
        <Suspense>
          <Providers>
            <Navbar />
            <div className="max-w-9/12 mx-auto p-4">{children}</div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
