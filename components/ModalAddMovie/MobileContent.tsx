'use client'

import styled from '@emotion/styled';
import FileUploader from '../FileUploader';
import Text from '../Text';
import Input from '../Input';
import Button from '../Button';

const MainSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 67px;
  width: 100%;
`;

const MiddleSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 56px;
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
`;

interface MobileContentProps {
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  file: File | null
  handleFileUploadSuccess: (uploadedFile: File | null) => void
  handleSubmit: () => Promise<void>
  onClose: () => void
}

export default function MobileContent({
  title,
  setTitle,
  file,
  handleFileUploadSuccess,
  handleSubmit,
  onClose
}: MobileContentProps) {
  return (
    <>
      <MainSection>
        <Text platform='mobile' fontSize='xxLarge' color='accent' fontWeight={700} letterSpacing='4px'>agregar película</Text>
        <MiddleSection>
          <FileUploader onChange={handleFileUploadSuccess} />
          <Input
            placeholder='título'
            id='titulo'
            value={title}
            platform='web'
            fontSize='medium'
            letterSpacing='4px'
            onChange={(value: string) => setTitle(value)}
          />
        </MiddleSection>
      </MainSection>
      <Controls>
        <Button variant='highlight' disabled={!file || title.length < 2} onClick={handleSubmit}>
          <Text platform='mobile' fontSize='large' color='primary' fontWeight={300} letterSpacing='4px' lineHeight="17px">subir película</Text>
        </Button>
        <Button variant='secondary' onClick={onClose}>
          <Text platform='mobile' fontSize='large' color='secondary' fontWeight={300} letterSpacing='4px' lineHeight="17px">salir</Text>
        </Button>
      </Controls>
    </>
  );
}
