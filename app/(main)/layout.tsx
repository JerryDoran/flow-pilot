// import Footer from '@/components/shared/footer';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
