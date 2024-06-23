import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import ThemeProvider from "@/components/providers/ThemeProvider";
import { ModalMenuProvider } from "@/components/ModalMenu/ModalMenuContext";
import { ModalAddMovieProvider } from "@/components/ModalAddMovie/ModalAddMovieContext";
import { AuthProvider } from "@/lib/context/AuthContext";

function AllTheProviders({ children }: { children: React.ReactNode }) {
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
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
