import React from 'react';
import { render } from '@testing-library/react';
import RootLayout, { metadata, viewport } from '../../app/layout';

jest.mock('@/components/providers', () => ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
));
jest.mock('@/lib/globalStyles', () => (
  <head>
    <style>{`.global {}`}</style>
  </head>
));

describe('RootLayout', () => {
  it('renders the global styles', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(container.querySelector('style')).toHaveTextContent('.global {}');
  });

  it('renders Providers with children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('renders the HTML structure correctly', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(container.querySelector('html')).toBeInTheDocument();
    expect(container.querySelector('body')).toBeInTheDocument();
  });

  it('has correct metadata and viewport properties', () => {
    expect(metadata).toEqual({
      title: "Home - Liteflix",
      description: "Stream Your Favorites Anytime, Anywhere"
    });

    expect(viewport).toEqual({
      width: "device-width",
      initialScale: 1,
      maximumScale: 1
    });
  });
});
