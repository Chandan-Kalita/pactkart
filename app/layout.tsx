import Image from "next/image";
import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import Header from "./components/Header";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
            <main className={styles.main}>
            <div className="min-h-screen bg-gray-100 p-4 w-full">
      {/* Header */}
      <Header/>

              {children}
</div>              
              </main>
        </body>
      </html>
    </StoreProvider>
  );
}
