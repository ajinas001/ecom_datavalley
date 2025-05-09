import { useState, useEffect } from 'react';
import { Heart, Globe, Clock, ShoppingCart, Check, Star, Shield, TruckIcon } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Get existing recent list or initialize as an empty array
    const recent = JSON.parse(localStorage.getItem("Recent")) || [];
  
    // Remove existing instance of the ID if it exists
    const updatedRecent = recent.filter(item => item !== id);
  
    // Add current ID at the beginning
    updatedRecent.unshift(id);
  
    // Optionally limit to last N recent views (e.g., 10)
    const limitedRecent = updatedRecent.slice(0, 10);
  
    // Save back to localStorage
    localStorage.setItem("Recent", JSON.stringify(limitedRecent));
  }, [id]);
  

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
      })
      .catch(err => console.error('Failed to fetch product:', err));
  }, [id]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Here you would typically dispatch to a cart context or store
    // For now, we'll just show a success state on the button
    setAddedToCart(true);
    
    // Reset button state after 2 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
    
    console.log('Added to cart:', {
      productId: product.id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      image: selectedImage
    });
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4 animate-pulse">
          <div className="h-4 w-32 bg-gray-300 rounded mb-6"></div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left skeleton image */}
            <div className="md:w-1/2">
              <div className="mb-4 h-[300px] w-2/3 bg-gray-300 rounded-lg"></div>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-20 h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>

            {/* Right skeleton content */}
            <div className="md:w-1/2 space-y-4">
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-5 h-5 bg-gray-300 rounded-full"></div>
                ))}
              </div>
              <div className="h-4 w-24 bg-gray-300 rounded mt-4"></div>
              <div className="flex gap-4 mt-2">
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-40 bg-gray-300 rounded"></div>
              </div>

              <div className="mt-6">
                <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 bg-gray-300 rounded"></div>
                  ))}
                </div>
              </div>

              <div className="mt-6 h-6 w-32 bg-gray-300 rounded"></div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="w-40 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="w-32 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className=" min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex mb-6 text-sm">
            <a href="/" className="text-gray-600 hover:text-primary">Home</a>
            
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary font-medium">{product.title}</span>
          </nav>

          <div className=" rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Product Images */}
              <div className="lg:w-2/5 p-6 lg:p-8 ">
                <div className="mb-6 relative group">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-96 object-contain rounded-lg"
                  />
                  
                  {/* Wishlist button floating */}
                  <button 
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all hover:scale-110"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  {product.images.slice(0, 4).map((thumb, index) => (
                    <div
                      key={index}
                      className={`border cursor-pointer rounded-lg transition-all ${
                        selectedImage === thumb 
                          ? 'border-primary ring-2 ring-primary ring-offset-2 scale-105' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedImage(thumb)}
                    >
                      <img src={thumb} alt={`Thumbnail ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Product Info */}
              <div className="lg:w-3/5 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-gray-100">
                {/* Product Title & Brand */}
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                      <p className="text-gray-500 text-sm">Brand: {product.brand || 'Premium Brand'}</p>
                    </div>
                    <div className="bg-primary/10 text-primary font-semibold py-1 px-3 rounded-full text-sm">
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                </div>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">₹{product.price}</h2>
                    <p className="text-sm text-green-600 font-medium mt-1">
                      <span className="line-through text-gray-400 mr-2">₹{Math.round(product.price * 1.2)}</span>
                      20% off
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm font-medium">{product.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500">256 reviews</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-200 mb-8"></div>

                {/* Size Options */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Select Size</h3>
                    <a href="#" className="text-primary text-sm hover:underline">Size Guide</a>
                  </div>
                  
                  <div className="flex gap-3">
                    {['S', 'M', 'L', 'XL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-lg flex items-center justify-center font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-primary'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                  {/* Quantity Selector */}
                  <div className="lg:w-1/3">
                    <p className="font-medium text-gray-900 mb-2">Quantity</p>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <div className="h-12 flex-1 flex items-center justify-center font-medium text-gray-900 border-l border-r border-gray-300">
                        {quantity}
                      </div>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                        disabled={quantity >= (product?.stock || 10)}
                      >
                        +  
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="lg:w-2/3">
                    <p className="font-medium text-gray-900 mb-2">Total: ₹{product.price * quantity}</p>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0 || addedToCart}
                      className={`w-full h-12 rounded-lg flex items-center justify-center font-medium transition-all ${
                        product.stock <= 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : addedToCart
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-primary hover:bg-primary/90 text-white'
                      }`}
                    >
                      {addedToCart ? (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Added to Cart!
                        </>
                      ) : product.stock <= 0 ? (
                        'Out of Stock'
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product benefits */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-sm text-gray-700">Free shipping worldwide</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-sm text-gray-700">Cancel anytime</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-sm text-gray-700">1 year warranty</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <TruckIcon className="w-5 h-5 mr-3 text-primary" />
                    <span className="text-sm text-gray-700">Fast delivery</span>
                  </div>
                </div>

                {/* Product Description */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description || 
                    "This premium product combines exceptional quality with stunning design. Made with high-grade materials, it offers outstanding durability and performance. The ergonomic design ensures maximum comfort during use, while the sleek aesthetics make it a stylish addition to any collection."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}