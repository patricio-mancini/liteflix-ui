import styled from '@emotion/styled';
import { useAuth } from '@/lib/context/AuthContext';
import { useModalAddMovie } from './ModalAddMovie';
import Text from './Text';
import Icon from './Icon';

interface AddMovieLinkProps {
  size: 'large' | 'xxLarge'
}

const StyledLink = styled.div<AddMovieLinkProps>`
  display: flex;
  gap: ${({ size }) => size === 'large' ? '12px' : '16px'};
  cursor: pointer;
`;

const IconContainer = styled.span<AddMovieLinkProps>`
  ${({ size }) => size === 'xxLarge' && 'line-height: 22px;'}
`;

export default function AddMovieLink({ size }: Readonly<AddMovieLinkProps>) {
  const { toggleModal } = useModalAddMovie();

  const { user, login } = useAuth();

  const handleAddMovie = () => {
    if (user) {
      toggleModal();
    } else {
      login();
    }
  };

  return (
    <StyledLink size={size} onClick={handleAddMovie}>
      <IconContainer size={size}>
        <Icon icon='plus' height={14} width={14} alt='Agregar' />
      </IconContainer>
      <Text platform='web' fontSize={size} color='secondary' fontWeight={700} letterSpacing='4px'>Agregar Película</Text>
    </StyledLink>
  );
};

