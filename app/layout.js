// app/layout.js
// Root layout component that wraps the entire application

import "./globals.css";
import { Suspense } from "react";
import Providers from "../lib/providers";
import { Navbar } from "../components/UI/navbar";
import  LoadingRequest  from "@/components/UI/loading/loadingRequest";
import LoadingClient  from "@/components/UI/loading/loadingClient";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-100 h-screen">
        <Suspense>
          <Providers>
            <Navbar />
            <LoadingRequest>
              <LoadingClient>{children}</LoadingClient>
            </LoadingRequest>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
