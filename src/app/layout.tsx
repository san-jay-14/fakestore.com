import { ReactNode } from "react";
import { Providers } from "../providers";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />

          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
