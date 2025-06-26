
import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'
import 'react-loading-skeleton/dist/skeleton.css'
import DarkModeToggle from "@/components/DarkModeToggle";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Task App",
  description: "Manage your tasks efficiently",
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {                             
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
        
      ><div className="flex justify-between items-center max-w-3xl mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
        <div className="mb-2">
          <DarkModeToggle />
        </div>
      
      </div>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
