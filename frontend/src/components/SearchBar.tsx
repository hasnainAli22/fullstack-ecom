'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string

    if (name) {
      router.push(`/list?search=${name}`)
    }
  }

  return (
    <form
      className="flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none"
      />
      <div>
        <button className="cursor-pointer mr-2">
          <Image src="/search.png" alt="" width={16} height={16} />
        </button>
        <Link href={'/image-search'}>
          <button className="cursor-pointer">
            <Image src="/imagesearch.png" alt="" width={16} height={16} />
          </button>
        </Link>
      </div>
    </form>
  )
}

export default SearchBar
