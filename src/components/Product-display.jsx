import React, { useEffect, useState } from 'react';
import { Heart, Star, Scale } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCompare, removeFromCompare } from '../redux/CompareSlice';

export const ProductDisplay = () => {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  const [womenProducts, setWomenProducts] = useState([]);
  const [menProducts, setMenProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [showCompareToast, setShowCompareToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Fetch women's dresses
    fetch('https://dummyjson.com/products/category/womens-dresses?limit=3')
      .then(res => res.json())
      .then(data => setWomenProducts(data.products))
      .catch(err => console.error('Failed to fetch women products:', err));

    // Fetch men's shirts
    fetch('https://dummyjson.com/products/category/mens-shirts?limit=3')
      .then(res => res.json())
      .then(data => setMenProducts(data.products))
      .catch(err => console.error('Failed to fetch men products:', err));

    // Fetch Recently Viewed Products
    const recentString = localStorage.getItem('Recent');
    let recentIds = [];

    try {
      recentIds = JSON.parse(recentString) || [];
    } catch (err) {
      console.error('Failed to parse Recent from localStorage:', err);
    }

    if (Array.isArray(recentIds) && recentIds.length > 0) {
      Promise.all(
        recentIds.map(id =>
          fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
        )
      )
        .then(products => setRecentProducts(products))
        .catch(err => console.error('Failed to fetch recent products:', err));
    }
  }, []);

  const handleCompareToggle = (product) => {
    const isInCompare = compareItems.some(item => item.id === product.id);

    if (isInCompare) {
      dispatch(removeFromCompare(product.id));
      showToast('Product removed from comparison');
    } else {
      if (compareItems.length >= 4) {
        showToast('You can compare up to 4 products only');
      } else {
        dispatch(addToCompare(product));
        showToast('Product added to comparison');
      }
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setShowCompareToast(true);
    setTimeout(() => {
      setShowCompareToast(false);
    }, 3000);
  };

  const renderProductCard = (product, index) => {
    const isInCompare = compareItems.some(item => item.id === product.id);

    return (
      <div key={index} className="group">
        <div className="relative overflow-hidden rounded-lg mb-3">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-2/4 md:w-3/4 aspect-[4/4] object-cover mx-auto"
          />

          <div className="absolute inset-x-0 bottom-0 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary">
            <a href={`/productDetails/${product.id}`} className="text-white font-medium">Quick View</a>
          </div>
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="p-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Heart size={18} className="text-gray-800" />
            </button>
            <button
              onClick={() => handleCompareToggle(product)}
              className={`p-2 rounded-full transition-opacity duration-300 ${isInCompare
                  ? 'bg-primary text-white'
                  : 'bg-white'
                }`}
            >
              <Scale size={18} className={isInCompare ? 'text-white' : 'text-gray-800'} />
            </button>
          </div>
        </div>
        <h3 className="font-medium text-gray-800 mb-1 truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
          {product.description.length > 60 ? product.description.slice(0, 60) + '...' : product.description}
        </p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="font-medium text-primary">Rs.{product.price}</span>
        </div>
        <div className="flex items-center">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                stroke="currentColor"
                className={`text-primary ${i < Math.floor(product.rating) ? '' : 'opacity-50'}`}
              />
            ))}
          </div>
          <span className="text-xs ml-1 text-gray-500">{product.rating}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Compare Toast Notification */}
        {showCompareToast && (
          <div className="fixed top-6 right-6 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
            {toastMessage}
          </div>
        )}

        {/* Compare Floating Button - Only show if items in compare */}
        {compareItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-30">
            <a
              href="/compare"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-full shadow-lg"
            >
              <Scale size={20} />
              <span>Compare ({compareItems.length})</span>
            </a>
          </div>
        )}

        {/* Recently Viewed Section */}
        {recentProducts.length > 0 && (
          <>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center">Recently Viewed</h2>
            <p className="text-center text-gray-600 mb-8">Based on your recent visits</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
              {[...recentProducts].slice(0, 3).map(renderProductCard)}
            </div>
          </>
        )}

        {/* Women's Dresses */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center">Women's Dresses</h2>
        <p className="text-center text-gray-600 mb-8">Explore trending styles for women</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {womenProducts.map(renderProductCard)}
        </div>

        {/* Men's Shirts */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-3 text-center">Men's Shirts</h2>
        <p className="text-center text-gray-600 mb-8">Explore casual and formal picks for men</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {menProducts.map(renderProductCard)}
        </div>

        {/* <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-md font-medium tracking-wide bg-gray-800 text-white">
            View All Products
          </button>
        </div> */}
      </div>
    </div>
  );
};