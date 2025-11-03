// app/layout.js
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "./navbar/navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 h-screen">
        <Providers>
          <Navbar />
          <div className="max-w-4xl mx-auto p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}


