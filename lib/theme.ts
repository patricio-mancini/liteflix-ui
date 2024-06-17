export interface Theme {
  colors: {
    primary: string
    secondary: string
    accent: string
    danger: string
    primaryTransparent: (alpha: number) => string
    secondaryTransparent: (alpha: number) => string
  }
  fontSizes: {
    web: {
      small: string
      medium: string
      large: string
      xLarge: string
      xxLarge: string
      xxxLarge: string
      xxxxLarge: string
      title: string
    }
    mobile: {
      small: string
      medium: string
      large: string
      xLarge: string
      xxLarge: string
      xxxLarge: string
      xxxxLarge: string
      title: string
    }
  }
}

enum COLORS {
  BLACK = '#242424',
  WHITE = '#FFFFFF',
  AQUA = '#64EEBC',
  RED = '#FF0000'
}

export const theme: Theme = {
  colors: {
    primary: COLORS.BLACK,
    secondary: COLORS.WHITE,
    accent: COLORS.AQUA,
    danger: COLORS.RED,
    primaryTransparent: (alpha: number) => hexToRgba(COLORS.BLACK, alpha),
    secondaryTransparent: (alpha: number) => hexToRgba(COLORS.WHITE, alpha),
  },
  fontSizes: {
    web: {
      small: '0.875rem',        // 14px
      medium: '1rem',           // 16px
      large: '1.125rem',        // 18px
      xLarge: '1.25rem',        // 20px
      xxLarge: '1.375rem',      // 22px
      xxxLarge: '1.5rem',       // 24px
      xxxxLarge: '2.125rem',    // 34px
      title: '7.5rem'           // 120px
    },
    mobile: {
      small: '0.875rem',        // 14px
      medium: '1rem',           // 16px
      large: '1.125rem',        // 18px
      xLarge: '1.25rem',        // 20px
      xxLarge: '1.375rem',      // 22px
      xxxLarge: '1.5rem',       // 24px
      xxxxLarge: '1.75rem',     // 28px
      title: '4.75rem',         // 76px
    }
  }
};

function hexToRgba(hex: string, alpha: number) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export type Platform = keyof Theme['fontSizes'];
export type FontSize = keyof Theme['fontSizes']['web'] | keyof Theme['fontSizes']['mobile'];
export type Color = keyof Theme['colors'];