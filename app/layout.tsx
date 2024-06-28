import type { Metadata, Viewport } from "next";
import Providers from "@/components/providers";
import GlobalStyles from "@/lib/styles/GlobalStyles";

export const metadata: Metadata = {
  title: "Home - Liteflix",
  description: "Stream Your Favorites Anytime, Anywhere"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalStyles />
          {children}
        </Providers>
      </body>
    </html>
  );
}
