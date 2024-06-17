'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalMenuContextType {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const ModalMenuContext = createContext<ModalMenuContextType | undefined>(undefined);

interface ModalMenuProviderProps {
  children: ReactNode;
}

export const ModalMenuProvider = ({ children }: Readonly<ModalMenuProviderProps>) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ModalMenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </ModalMenuContext.Provider>
  );
};

export const useModalMenu = (): ModalMenuContextType => {
  const context = useContext(ModalMenuContext);
  if (!context) {
    throw new Error('useModalMenu must be used within a ModalMenuProvider');
  }
  return context;
};
