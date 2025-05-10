import { useState } from 'react';
import { 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    // Subscribe logic would go here
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-teal-800 text-white mt-16 px-0 md:px-20">
      {/* Features Banner */}
      <div className=" py-6">
        <div className="container mx-auto px-4 flex flex-wrap justify-around items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <CreditCard className="mr-2" size={20} />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center mb-4 md:mb-0">
            <Truck className="mr-2" size={20} />
            <span>Free Shipping over $99</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="mr-2" size={20} />
            <span>30-Day Returns</span>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-medium mb-4">ELEGANCE</h3>
            <p className="text-gray-200 mb-4">
              Stylish and comfortable clothing for every occasion. Discover our collection of elegant outfits.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-teal-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-teal-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-teal-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Shop</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Sale</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">My Account</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Returns Policy</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-200 hover:text-teal-300 transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Join Our Newsletter</h3>
            <p className="text-gray-200 mb-4">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-4 py-2 w-full text-white focus:outline-none"
              />
              <button 
                onClick={handleSubscribe} 
                className="bg-teal-600 hover:bg-teal-500 px-4 transition-colors"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className=" py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} ELEGANCE. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}