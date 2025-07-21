import Footer from "@/components/ui/footer/Footer";
import SideBar from "@/components/ui/side-bar/SideBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      

      <TopMenu />
      <SideBar />

      <div className="sm:px-10 px-0">
        {children}
      </div>

      <Footer />
    </div>
  );
}