// src/app/layout.tsx (修正後)

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Geistの代わりに、より標準的なInterフォントを使用
import "./globals.css";

// Interフォントを読み込み、サブセットとしてlatinを指定
const inter = Inter({ subsets: ["latin"] });

// メタデータをあなたのアプリケーションに合わせて修正
export const metadata: Metadata = {
  title: "TODO管理アプリ",
  description: "チームのタスクを効率的に管理するためのアプリケーション",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 言語を日本語に設定
    <html lang="ja">
      {/* <body>にフォントクラスと、背景色を適用 */}
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}