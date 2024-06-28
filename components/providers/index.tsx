'use client'

import { ModalMenuProvider } from "../ModalMenu";
import { ModalAddMovieProvider } from "../ModalAddMovie";
import { AuthProvider } from "@/lib/context/AuthContext";
import StyledComponentsRegistry from "@/lib/styles/StyledComponentsRegistry";
import { ThemeProvider } from "styled-components";
import { theme } from "@/lib/theme";

export default function Providers({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <StyledComponentsRegistry>
        <ThemeProvider theme={theme}>
          <ModalMenuProvider>
            <ModalAddMovieProvider>
              {children}
            </ModalAddMovieProvider>
          </ModalMenuProvider>
        </ThemeProvider>
      </StyledComponentsRegistry>
    </AuthProvider>
  );
}
