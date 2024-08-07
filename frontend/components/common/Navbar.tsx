import Link from 'next/link'
import Menu from './Menu'
import Image from 'next/image'
import SearchBar from './SearchBar'
//import dynamic from 'next/dynamic'
import NavIcons from './NavIcons'

//const NavIcons = dynamic(() => import('./NavIcons'), { ssr: false })

const Navbar = () => {
  return (
    <div className="h-16 md:px-8 lg:px-16 xl:px-16 2xl:px-32 relative">
      {/* MOBILE */}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={80} height={45} />
          <div className="text-xl tracking-wide">CommerceCraft</div>
        </Link>
        <div className="flex flex-row">
          <NavIcons />
          <Menu />
        </div>
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="" sizes="20vh" width={80} height={80} />
            <div className="text-xl tracking-wide">CommerceCraft</div>
          </Link>
          <div className="hidden xl:flex gap-3">
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar
