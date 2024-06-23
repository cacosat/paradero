import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paradero",
  description: "Donde viene la micro?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}  
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
