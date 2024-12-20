import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "./contexts/auth-context";
import { FavoriteProvider } from "./contexts/favorites-context";
import { PageWrapper } from "./components/page-wrapper";
import { UserProfileProvider } from "./contexts/user-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "English Dictionary",
  description: "An english dictionary app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider>
          <AuthProvider>
            <FavoriteProvider>
              <UserProfileProvider>
                <PageWrapper>
                  <main className="light">{children}</main>
                </PageWrapper>
                <ToastContainer />
              </UserProfileProvider>
            </FavoriteProvider>
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
