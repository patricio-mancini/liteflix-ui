import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';
import { iconMap } from '@/lib/icons';

interface IconProps extends Omit<ImageProps, 'src'> {
  icon: keyof typeof iconMap;
  color?: string;
  alt: string;
  override?: string
}

const StyledIcon = styled(Image)<{ color?: string, override?: string }>`
  display: inline-block;
  ${({ color }) => color && `fill: ${color}`};
  ${({ override }) => override};
`;

export default function Icon({
  icon,
  width,
  height,
  color,
  alt,
  override
}: Readonly<IconProps>) {
  const src = iconMap[icon];
  if (!src) {
    console.error(`Icon "${icon}" not found`);
    return null;
  }
  return (
    <StyledIcon
      priority
      src={src}
      alt={alt}
      width={width}
      height={height}
      color={color}
      override={override}
    />
  );
}
