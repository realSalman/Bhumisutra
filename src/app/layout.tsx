import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ভূমিসূত্র — সরকারি ভূমি রেকর্ড যাচাই ও মার্কেটপ্লেস",
  description:
    "বাংলাদেশের সকল ভূমি রেকর্ড এক প্ল্যাটফর্মে। দলিল যাচাই, মালিকানা নিশ্চিতকরণ এবং যাচাইকৃত জমি ক্রয়-বিক্রয়।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body style={{ fontFamily: "var(--font-sans)" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// ---- Navbar ----
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <a href="/" className="navbar__brand">
          <span className="navbar__brand-icon">ভূ</span>
          ভূমিসূত্র
        </a>
        <ul className="navbar__links">
          <li>
            <a href="/marketplace" className="navbar__link">
              মার্কেটপ্লেস
            </a>
          </li>
          <li>
            <a href="/verify" className="navbar__link">
              দলিল যাচাই
            </a>
          </li>
          <li>
            <a href="/about" className="navbar__link">
              সম্পর্কে
            </a>
          </li>
          <li>
            <a href="/login" className="btn btn--primary btn--sm">
              লগইন
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ---- Footer ----
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <span>© ২০২৬ ভূমিসূত্র — সরকারি ভূমি রেকর্ড প্ল্যাটফর্ম</span>
          <ul className="footer__links">
            <li>
              <a href="/about" className="footer__link">
                সম্পর্কে
              </a>
            </li>
            <li>
              <a href="/verify" className="footer__link">
                দলিল যাচাই
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
