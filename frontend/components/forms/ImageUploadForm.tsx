// components/ImageUploadForm.tsx
import { useState, ChangeEvent, FormEvent } from 'react'

interface ImageUploadFormProps {
  onSubmit: (formData: FormData) => void
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onSubmit }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex justify-between">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white"
        type="submit"
      >
        Search
      </button>
    </form>
  )
}

export default ImageUploadForm
