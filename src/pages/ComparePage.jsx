import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { X, ChevronLeft, ShoppingCart, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { removeFromCompare, clearCompare } from '../redux/compareSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function ComparePage() {
  const dispatch = useDispatch();
  
  // Get compare items from state
  const compareItems = useSelector((state) => state.compare.items);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [addedToCart, setAddedToCart] = useState({});

  // If no items to compare, show empty state
  if (!compareItems || compareItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-16 px-4 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Compare Products</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-6 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">No Products to Compare</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  You haven't added any products to compare yet. Browse products and click the compare icon to add them here.
                </p>
                <Link to="/" className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Browse Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const handleRemoveItem = (id) => {
    dispatch(removeFromCompare(id));
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
  };

  const handleAddToCart = (product) => {
    // Create cart item from product data
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.thumbnail,
      brand: product.brand
    };
    
    // Dispatch to Redux
    dispatch(addToCart({
      item: cartItem,
      isUpdate: false
    }));
    
    // Show success state on button
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Define comparison attributes
  const attributes = [
    { name: 'Brand', key: 'brand' },
    { name: 'Price', key: 'price', format: (val) => `₹${val}` },
    { name: 'Discount', key: 'discountPercentage', format: (val) => `${val}%` },
    { name: 'Rating', key: 'rating' },
    { name: 'Stock', key: 'stock' },
    { name: 'Category', key: 'category' }
  ];

  return (
    <>
      <Navbar />
      <div className="py-8 px-4 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Header with back button */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary mr-4">
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Back to Shopping</span>
              </Link>
            </div>
            <button 
              onClick={handleClearAll}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Clear All
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Compare Products</h1>

          {/* Responsive Card View for Small Screens */}
          <div className="md:hidden space-y-6">
            {compareItems.map(item => (
              <div key={item.id} className=" dark:bg-gray-800 rounded-xl shadow-md p-4">
                <div className="relative">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="absolute -top-2 -right-2  dark:bg-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-32 h-32 mb-2">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <Link 
                      to={`/productDetails/${item.id}`}
                      className="font-medium text-gray-900 dark:text-white hover:text-primary text-sm text-center"
                    >
                      {item.title}
                    </Link>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-4 h-4 ${star <= item.rating ? 'fill-yellow-400' : ''}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {attributes.map(attr => (
                      <div key={attr.key} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-800 dark:text-white">{attr.name}:</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {attr.format && item[attr.key] ? attr.format(item[attr.key]) : item[attr.key] || '-'}
                        </span>
                      </div>
                    ))}
                    
                    <div className="text-sm">
                      <span className="font-medium text-gray-800 dark:text-white block mb-1">Description:</span>
                      <p className="text-gray-700 dark:text-gray-300">
                        {item.description && item.description.length > 100 
                          ? `${item.description.substring(0, 100)}...` 
                          : item.description || '-'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-800 dark:text-white mb-2">Size:</div>
                    <div className="flex gap-1 mb-4">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all ${
                            selectedSize === size
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={addedToCart[item.id]}
                      className={`w-full py-2 px-4 rounded flex items-center justify-center text-sm font-medium transition-all ${
                        addedToCart[item.id]
                          ? 'bg-green-600 text-white'
                          : 'bg-primary hover:bg-primary/90 text-white'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {addedToCart[item.id] ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Medium and Large Screens */}
          <div className="hidden md:block  dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="w-full">
              <table className="w-full">
                <thead className=" dark:bg-gray-750">
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-4 text-left w-40 text-gray-500 dark:text-gray-400 font-medium text-sm font-bold">Product</th>
                    {compareItems.map(item => (
                      <th key={item.id} className="p-4 text-center">
                        <div className="relative">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute -top-2 -right-2 bg-white dark:bg-gray-700 rounded-full p-1 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Image Row */}
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-800 dark:text-white">Image</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 mb-2">
                            <img 
                              src={item.thumbnail} 
                              alt={item.title} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <Link 
                            to={`/productDetails/${item.id}`}
                            className="font-medium text-gray-900 dark:text-white hover:text-primary text-sm"
                          >
                            {item.title}
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-800 dark:text-white">Rating</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        <div className="flex justify-center items-center">
                          <div className="flex text-yellow-400 mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`w-4 h-4 ${star <= item.rating ? 'fill-yellow-400' : ''}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{item.rating}</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Size Selection Row */}
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-800 dark:text-white">Size</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        <div className="flex justify-center">
                          <div className="flex gap-1">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium transition-all ${
                                  selectedSize === size
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Attribute Rows */}
                  {attributes.map(attr => (
                    <tr key={attr.key} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-800 dark:text-white">{attr.name}</td>
                      {compareItems.map(item => (
                        <td key={item.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                          {attr.format && item[attr.key] ? attr.format(item[attr.key]) : item[attr.key] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Description Row */}
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="p-4 font-medium text-gray-800 dark:text-white">Description</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 text-center text-gray-700 dark:text-gray-300">
                        <p className="text-sm text-left">
                          {item.description && item.description.length > 100 
                            ? `${item.description.substring(0, 100)}...` 
                            : item.description || '-'}
                        </p>
                      </td>
                    ))}
                  </tr>

                  {/* Action Row */}
                  <tr>
                    <td className="p-4 font-medium text-gray-800 dark:text-white">Actions</td>
                    {compareItems.map(item => (
                      <td key={item.id} className="p-4 text-center">
                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={addedToCart[item.id]}
                          className={`w-full py-2 px-4 rounded flex items-center justify-center text-sm font-medium transition-all ${
                            addedToCart[item.id]
                              ? 'bg-green-600 text-white'
                              : 'bg-primary hover:bg-primary/90 text-white'
                          }`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {addedToCart[item.id] ? 'Added' : 'Add to Cart'}
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}