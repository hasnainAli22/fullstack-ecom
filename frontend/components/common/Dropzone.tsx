// components/Dropzone.tsx
import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import imageIcon from '@/public/image-icon.png'
import Image from 'next/image';
import { ImageFileContext } from '@/context/ImageFileContext';
import { useRouter } from 'next/navigation';

const Dropzone: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // selectedImageForPreview
  const [searchImage, setSearchImage] = useState<File | null>(null) //searchImageFile
  const {file, setFile} =useContext(ImageFileContext);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
        setSearchImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const router = useRouter();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Set the image to the context
    setFile(searchImage)
    // redirect to the search-image
    router.push('image-search')
    console.log("redirecting")

  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    multiple: false, // Ensure only one file is accepted
    accept: {
        'image/*': ['.png', '.jpg', '.jpeg']
      }// Accept only images
  });

  return (
    <div
      {...getRootProps()}
      className="custom-drag-drop p-2 py-5 bg-slate-50 border-2 border-dashed border-lama rounded-lg relative w-full flex flex-col items-center"
    >
      <input {...getInputProps()} />
      {selectedImage ? (
        <div className="drag-drop-container flex flex-col items-center gap-4">
            <h2 className="text-base">Image Search <span className="text-xs text-gray-400 font-italic">powered by <b>AI</b></span></h2>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-44 h-44 object-cover rounded-lg"
            onClick={open}
          />
          <div className="flex w-full justify-between">
          <button
            type="button"
            className="mt-auto rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white"
            onClick={open}
          >
            Replace
          </button>
          <button
          type="button"
          className="mt-auto rounded-2xl ring-1 ring-lama w-max py-2 px-4 text-xs bg-lama text-white"
          onClick={handleSubmit}
        >
          Search
        </button>
          </div>
        </div>
      ) : (
        <div className="drag-drop-content flex flex-col items-center gap-4 cursor-pointer" onClick={open} >
            <h2 className="text-base">Image Search <span className="text-xs text-gray-400 font-italic">powered by <b>AI</b></span></h2>
            <Image src={imageIcon} width={40} height={40} alt='image-search-icon'/>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
