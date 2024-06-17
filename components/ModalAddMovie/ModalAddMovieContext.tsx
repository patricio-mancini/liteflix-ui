'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalAddMovieContextType {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const ModalAddMovieContext = createContext<ModalAddMovieContextType | undefined>(undefined);

interface ModalAddMovieProviderProps {
  children: ReactNode;
}

export const ModalAddMovieProvider = ({ children }: Readonly<ModalAddMovieProviderProps>) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <ModalAddMovieContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </ModalAddMovieContext.Provider>
  );
};

export const useModalAddMovie = (): ModalAddMovieContextType => {
  const context = useContext(ModalAddMovieContext);
  if (!context) {
    throw new Error('useModalAddMovie must be used within a ModalAddMovieProvider');
  }
  return context;
};
