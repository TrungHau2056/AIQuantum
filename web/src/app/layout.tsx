import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/lib/role-context";
import { AppShell } from "@/components/layout/app-shell";

const vietnameseSans = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CarbonPilot — Hỗ trợ quyết định tuân thủ carbon",
  description:
    "Nền tảng chuẩn hóa dữ liệu carbon và lựa chọn phương án tuân thủ tối ưu cho doanh nghiệp, ngân hàng, nhà đầu tư và cơ quan quản lý.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${vietnameseSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <RoleProvider>
          <AppShell>{children}</AppShell>
        </RoleProvider>
      </body>
    </html>
  );
}
