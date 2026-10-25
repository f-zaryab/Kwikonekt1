import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata } from "next";
import { Commissioner } from "next/font/google";
import theme from "@/theme";
import TanStackProvider from "./providers/tanstack.provider";
import "@mantine/core/styles.css";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kwick-Konkt",
  description: "Instant meeting Schdeular",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={commissioner.variable} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <TanStackProvider>{children}</TanStackProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
