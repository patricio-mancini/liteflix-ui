'use client'

import FileUploader from '../FileUploader';
import Text from '../Text';
import Input from '../Input';
import Button from '../Button';

interface DesktopContentProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  handleFileUploadSuccess: (uploadedFile: File | null) => void;
  handleSubmit: () => Promise<void>;
}

export default function DesktopContent({
  title,
  setTitle,
  file,
  handleFileUploadSuccess,
  handleSubmit,
}: DesktopContentProps) {
  return (
    <>
      <Text platform='web' fontSize='xLarge' color='accent' fontWeight={700} letterSpacing='4px'>agregar película</Text>
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
      <Button variant='highlight' disabled={!file || title.length < 2} onClick={handleSubmit}>
        <Text platform='web' fontSize='large' color='primary' fontWeight={300} letterSpacing='4px' lineHeight="17px">subir película</Text>
      </Button>
    </>
  );
}
