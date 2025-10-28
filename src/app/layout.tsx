import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gatorpower",
  description: "Leverage the extensive full-stack development expertise of Phil Tucker. Gain insights into effective software development across various industries, utilizing technologies like HTML5, CSS3, JavaScript, Angular, and React. Ideal for aspiring and experienced developers seeking practical, real-world guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}