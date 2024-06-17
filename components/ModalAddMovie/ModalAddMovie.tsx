import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { isMobile } from 'react-device-detect';
import { useModalAddMovie } from './ModalAddMovieContext';
import { uploadMovie } from '@/lib/api/client';
import DesktopContent from './DesktopContent';
import MobileContent from './MobileContent';
import ModalContainer from './ModalContainer';
import Congratulations from './Congratulations';
import { Overlay } from '../Overlay';

export default function ModalAddMovie() {
  const router = useRouter();
  const { isModalOpen, toggleModal } = useModalAddMovie();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [, startTransition] = useTransition();
  const [modalKey, setModalKey] = useState<number>(0);

  const handleFileUploadSuccess = (uploadedFile: File | null) => {
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (file && title) {
      const { isSuccess, errorMessage } = await uploadMovie(file, title);

      if (isSuccess) {
        setIsSuccess(true);
        startTransition(() => {
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });
      } else {
        console.error(errorMessage);
      }
    }
  };

  const handleClose = () => {
    console.log('handleClose is called');
    toggleModal();
    setIsSuccess(false);
    setFile(null);
    setTitle('');
    setModalKey(prevKey => prevKey + 1);
  }

  const Content = isMobile ? MobileContent : DesktopContent;

  return (
    <>
      <Overlay isVisible={isModalOpen} zIndex={5} />
      <ModalContainer isVisible={isModalOpen} onClose={handleClose}>
        {isSuccess ?
          <Congratulations title={title} onClose={handleClose} /> :
          <Content
            key={modalKey}
            title={title}
            setTitle={setTitle}
            file={file}
            handleFileUploadSuccess={handleFileUploadSuccess}
            handleSubmit={handleSubmit}
            onClose={handleClose}
          />
        }
      </ModalContainer>
    </>
  );
}
