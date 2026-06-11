import Image from 'next/image'
import Link from 'next/link'
// import CategoryDrawer from "./category-drawer";
import Search from './Search'
import ViewAllProductsButton from './view-all-products-button'

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm font-work-sans">
      {/* Navbar */}
      <nav className="px-5 py-3 flex justify-between items-center">
        {/* <div><CategoryDrawer/></div> */}
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/images/logo2.jpg" alt="logo" width={200} height={40} />
        </Link>
        <div className="hidden md:block">
          <Search />
        </div>
        {/* Navigation */}
        <div className="flex items-center gap-6 text-black dark:text-white">
          <Link href="/" className="text-sm hover:text-blue-600">
            Home
          </Link>
          <Link href="/shop" className="text-sm hover:text-blue-600">
            Products
          </Link>
          <Link href="/about" className="text-sm hover:text-blue-600">
            About Us
          </Link>
          <Link href="/brands" className="text-sm hover:text-blue-600">
            Brands
          </Link>
          <Link href="/contact" className="text-sm hover:text-blue-600">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[400px]">
        <Image
          src="/images/banner.jpg" // replace with your hero image
          alt="Hero Banner"
          fill
          priority
          className="object-cover"
        />
        {/* Optional overlay text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Company</h1>
          <p className="mb-6">Explore the best products from top brands</p>
          <p className="mb-18">Control & Monitoring: DCS, ESD. SCADA, HMI, PLC</p>
          <ViewAllProductsButton />
        </div>
      </div>
    </header>
  )
}

export default Navbar
