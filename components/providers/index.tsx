'use client'

import ThemeProvider from "./ThemeProvider";
import { ModalMenuProvider } from "../ModalMenu";
import { ModalAddMovieProvider } from "../ModalAddMovie";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function Providers({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ModalMenuProvider>
          <ModalAddMovieProvider>
            {children}
          </ModalAddMovieProvider>
        </ModalMenuProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
