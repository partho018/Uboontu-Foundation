import { Inter } from "next/font/google";
import "./globals.css";
import "./page.css";
import "./about/about.css";
import "./our-work/our-work.css";
import "./get-involved/get-involved.css";
import "./blog/blog.css";
import "./contact/contact.css";
import MainLayout from "@/components/MainLayout";
import StyledJsxRegistry from "./registry";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Uboontu Foundation | Transforming Waste into Opportunity",
  description: "Uboontu Foundation is a social impact organization working towards sustainable communities through innovative waste management, environmental education, circular economy initiatives, and community participation.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <StyledJsxRegistry>
          <MainLayout>{children}</MainLayout>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
