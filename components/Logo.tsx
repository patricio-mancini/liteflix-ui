'use client'

import Text from './Text';
import { FontSize, Platform } from '@/lib/theme';

interface LogoProps {
  platform: Platform
  fontSize: FontSize
}

export default function Logo({ platform, fontSize }: Readonly<LogoProps>) {
  return (
    <>
      <Text platform={platform} fontSize={fontSize} color='accent' fontWeight={700} letterSpacing='4px'>LITE</Text>
      <Text platform={platform} fontSize={fontSize} color='accent' fontWeight={300} letterSpacing='4px'>FLIX</Text>
    </>
  );
}