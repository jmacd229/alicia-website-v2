const themePalette: Record<ThemePalette, Record<Shade, string>> = {
  grey: {
    a: '#F1F1F1',
    b: '#B9B9B9',
    c: '#818181',
  },
  blue: {
    a: '#85D4D0',
    b: '#00C2CB',
    c: '#00838A',
  },
  jade: {
    a: '#4B8C91',
    b: '#3D7276',
    c: '#2A4E51',
  },
  tan: {
    a: '#FCF6EC',
    b: '#F4E2C1',
    c: '#E3B562',
  },
};

export const rgbColors: Partial<Record<ThemePalette, Partial<Record<Shade, string>>>> = {
  blue: {
    c: '0, 131, 138'
  },
  tan: {
    b: '244, 226, 193',
    c: '227, 181, 98',
  },
};

const commonPalette = { white: '#FFFFFF', black: '#000000' };

export const colors = { ...themePalette, ...commonPalette };

type ThemePalette = 'grey' | 'blue' | 'tan' | 'jade';
type CommonPalette = 'black' | 'white';

// Limiting shades for styling consistency. Using alphabet for easy reference
type Shade = 'a' | 'b' | 'c';

export type Color = ThemePalette | `${ThemePalette}-${Shade}` | CommonPalette;

export const getColor = (color: Color): string => {
  const [palette, shade] = color.split('-');
  if (typeof colors[palette] === 'string') {
    return colors[palette];
  }
  return colors[palette][shade ?? 'b'];
};

export default colors;
