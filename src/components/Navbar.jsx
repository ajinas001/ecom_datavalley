import { useState } from 'react';
import {
  Menu,
  ShoppingBag,
  Heart,
  User,
  X,
  Search,
  Moon,
  ChevronRight
} from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <div className="relative">
      {/* Main Navbar */}
      <nav className="bg-light dark:bg-black py-4 px-2 pt-12 md:px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Left side - Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 text-dark hover:text-primary transition-colors duration-200"
              >
                <Menu size={22} />
                <span className="hidden sm:inline font-medium">Menu</span>
              </button>
            </div>

            {/* Center - Brand */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                isSearchOpen ? '-mt-12 opacity-0' : 'mt-0 opacity-100'
              }`}
            >
              <a href='/'>
              <h1 className="font-bold text-xl md:text-2xl tracking-wider text-primary">
                ELEGANCE 
              </h1>
              </a>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* <button onClick={toggleSearch}>
                <Search size={22} className="text-dark" />
              </button> */}
 <button
                className="text-dark dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                <Moon size={22} />
                {/* {darkMode ? <Sun size={22} /> : <Moon size={22} />} */}
              </button>
              <div className="relative">
                <ShoppingBag size={22} className="text-dark" />
                <span className="absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center bg-primary text-white">
                  2
                </span>
              </div>

              <div className="relative">
                <Heart size={22} className="text-dark" />
                <span className="absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center bg-secondary text-white">
                  1
                </span>
              </div>

              <User size={22} className="text-dark hidden sm:block" />
            </div>
          </div>

       
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white transition-all duration-300">
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-8 border-b pb-4 border-light">
              <h2 className="text-xl font-bold text-primary">Menu</h2>
              <button
                onClick={toggleMenu}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} className="text-dark" />
              </button>
            </div>

            <div className="space-y-6">
              {[
                { name: 'Home', url: '#' },
                { name: 'New Collection', url: '#' },
                { name: 'Women', url: '#' },
                { name: 'Men', url: '#' },
                { name: 'Accessories', url: '#' },
                { name: 'Sale', url: '#', highlight: true },
                { name: 'About Us', url: '#' },
                { name: 'Contact', url: '#' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  className={`flex items-center justify-between py-2 border-b border-light text-lg ${
                    item.highlight ? 'text-accent font-semibold' : 'text-dark'
                  }`}
                >
                  {item.name}
                  <ChevronRight size={18} className="opacity-70" />
                </a>
              ))}
            </div>

            <div className="mt-16 flex flex-col space-y-4">
              <button className="py-3 px-6 rounded-lg font-medium flex items-center justify-center bg-primary text-white">
                <User size={18} className="mr-2" />
                Account
              </button>

              <div className="flex justify-between text-sm pt-4 border-t border-light text-dark opacity-70">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
