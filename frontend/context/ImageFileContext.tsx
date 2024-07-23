'use client'

import { createContext, useState, ReactNode } from 'react';

type FileContextType = {
    file: File | null;
    setFile: (file: File | null) => void;
  };
  
  const defaultFileContext: FileContextType = {
    file: null,
    setFile: () => {},
  };

export const ImageFileContext = createContext(defaultFileContext)
export const ImageFileProvider: React.FC<{children: ReactNode}> = ({children  }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <ImageFileContext.Provider value={{ file, setFile }}>
      {children}
    </ImageFileContext.Provider>
  );
};
