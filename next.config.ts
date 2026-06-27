import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Trava a raiz do projeto. Sem isso, o Next/Turbopack pode inferir a pasta
  // pai (C:\...\Antigravity, que contém ~28 outros projetos + .zips) como raiz
  // e tentar varrê-la inteira, estourando a memória e travando o PC.
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ["sharp", "archiver", "puppeteer"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' blob:",
              "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
