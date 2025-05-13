import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-white">
      <Header /> <div className="min-h-screen">{children}</div> <Footer />
    </main>
  );
}
