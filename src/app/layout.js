import { CustomProvider } from "@/store/customProvider";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./css/typography.css";
import "./css/color.css";
import "./css/globals.css";

import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header/index";
import Footer from "@/components/organisms/Footer/Footer";
import LayoutWrapper from "@/components/atoms/LayoutWrapper/LayoutWrapper";

const inter = localFont({
  src: "../../public/assets/fonts/Inter_18pt-Regular.ttf",
  variable: "--inter",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata = {
  title: "Scalisi Produce",
  description:
    "Browse our Mother's day collection, including exotic produce and a wide array of flowers!",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <CustomProvider>
          <ToastContainer />
          <Header />
          <LayoutWrapper>{children}</LayoutWrapper>
          <Footer />
        </CustomProvider>
      </body>
    </html>
  );
}
