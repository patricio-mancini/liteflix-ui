import { useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import Text from './Text';
import Icon from './Icon';
import ProgressBar, { ActionType } from './ProgressBar';
import { Platform } from '@/lib/theme';

const DropZone = styled.div<{ theme?: Theme }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: ${isMobile ? '81px' : '100px'};
  width: 100%;
  border: 1px dashed ${({ theme }) => theme.colors.secondary};
  ${isMobile && 'margin-top: 5px;'}
`;

interface FileUploaderProps {
  onChange: (file: File | null) => void;
}

export default function FileUploader({ onChange }: FileUploaderProps) {
  const [progress, setProgress] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    readAndUploadFile(droppedFile);
  };

  const handleSelectFile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.jpg,.jpeg,.png';
    fileInput.onchange = (event) => {
      const selectedFile = (event.target as HTMLInputElement).files?.[0];
      if (selectedFile) {
        readAndUploadFile(selectedFile);
      }
    };
    fileInput.click();
  };

  const readAndUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const calculatedProgress = Math.round((event.loaded / event.total) * 100);
        setProgress(calculatedProgress);
      }
    };
    reader.onloadend = () => {
      setProgress(100);
      onChange(file);
    };
    reader.onerror = () => {
      setProgress(0);
      setIsError(true);
      onChange(null);
    };
    reader.readAsText(file);
  };

  const handleAction = (action: ActionType) => {
    if (action === 'cancel') {
      setProgress(0);
    } else if (action === 'retry') {
      setProgress(0);
      setIsError(false);
    }
  };

  const { platform, fontWeight, lineHeight } = useMemo<{
    platform: Platform,
    fontWeight: number,
    lineHeight: string
  }>(()=> {
    return {
      platform: isMobile ? 'mobile' : 'web',
      fontWeight: isMobile ? 300 : 700,
      lineHeight: isMobile ? '1' : '19.2px'
    };
  }, []);

  return (
    <>
      {progress < 100 ? (
        <DropZone onDrop={handleDrop} onClick={handleSelectFile} onDragOver={(e) => e.preventDefault()}>
          <span>
            <Icon icon='clip' height={16} width={16} alt="Attach File" />
          </span>
          <div>
            <Text
              platform={platform}
              fontSize='medium'
              color='secondary'
              fontWeight={fontWeight}
              letterSpacing='4px'
              lineHeight={lineHeight}
            >
              Agregá un archivo
            </Text>
            {!isMobile && (
              <Text
                platform='web'
                fontSize='medium'
                color='secondary'
                fontWeight={300}
                letterSpacing='4px'
                override='white-space: pre-wrap;'
              > o arrastralo y soltalo aquí</Text>
            )}
          </div>
        </DropZone>
      ) : (
        <ProgressBar progress={progress} isError={isError} onAction={handleAction} />
      )}
    </>
  );
}
