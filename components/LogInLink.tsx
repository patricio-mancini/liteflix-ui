'use client'

import Image from 'next/image';
import styled from 'styled-components';
import Icon from './Icon';
import { useAuth } from '@/lib/context/AuthContext';

const Link = styled.span`
  cursor: pointer;
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

export default function LogInLink() {
  const { user, login } = useAuth();
  return (
    <Link onClick={() => login()}>
      {user && user.photo ? (
        <RoundedImage 
          src={user.photo} 
          alt="Perfil" 
          height={40} 
          width={40} 
        />
      ) : (
        <Icon icon="profile" height={40} width={40} alt="Perfil" />
      )}
    </Link>
  );
}
