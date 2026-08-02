import Footer from "./components/Footer";
import Navbar from "./components/navbar/Navbar";

import ScrollToTop from "./components/ScrollToTop";
import SocialSidebar from "./components/socialsidebar/SocialSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <main className="min-h-screen flex flex-col bg-slate-900">
        <Navbar />
        {children}
        <SocialSidebar />
        <ScrollToTop />
        <Footer />
      </main>

    </>
  );
}