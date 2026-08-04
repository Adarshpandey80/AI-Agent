import "./globals.css";
import Navbar from "@/components/Nav";

export const metadata = {
  title: "AI Job Agent",
  description: "A professional AI job search dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}