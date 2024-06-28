'use client';

import styled from 'styled-components';

const GradientContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 193px;
  width: 100%;
  background: linear-gradient(180deg, rgba(36, 36, 36, 0) 0%, #242424 100%);
`;

export default function LinearGradient() {
  return (
    <GradientContainer />
  );
}
