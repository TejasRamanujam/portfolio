import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEJAS RAMANUJAM | Software Engineer",
  description:
    "AI-integrated software engineering portfolio — UTD '26. Data-driven, architecturally precise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ide-black text-syntax-white antialiased">
        {children}
      </body>
    </html>
  );
}
