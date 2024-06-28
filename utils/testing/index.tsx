import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from "styled-components";
import { ModalMenuProvider } from "@/components/ModalMenu/ModalMenuContext";
import { ModalAddMovieProvider } from "@/components/ModalAddMovie/ModalAddMovieContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { theme } from '@/lib/theme';
import StyledComponentsRegistry from '@/lib/styles/StyledComponentsRegistry';

function AllTheProviders({ children }: { children: React.ReactNode }) {
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
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
