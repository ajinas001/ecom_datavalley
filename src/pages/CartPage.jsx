import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
} from '../redux/cartSlice';
import { Navbar } from '../components/Navbar';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Footer from '../components/Footer';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(state => state.cart);

  const handleQuantityChange = (item, newQty) => {
    if (newQty < 1) return;
    dispatch(updateCartItemQuantity({ id: item.id, size: item.size, quantity: newQty }));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart({ id: item.id, size: item.size }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
    <div className="min-h-screen ">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Your Cart</h1>
        <p className="text-gray-500 mb-8">
          {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in your shopping cart
        </p>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16  rounded-2xl shadow-sm">
            <ShoppingBag size={64} className="text-gray-300 mb-6" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <a href="/" className="px-6 py-3 bg-primary text-white font-medium rounded-lg  transition-colors">
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow">
              <div className=" rounded-2xl shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 text-sm font-medium text-gray-500">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="divide-y divide-gray-100">
                  {items.map((item, index) => (
                    <div key={index} className="p-6 md:grid md:grid-cols-12 md:gap-4 flex flex-col gap-4">
                      {/* Product Info */}
                      <div className="col-span-6 flex gap-4 items-center">
                        <div className=" rounded-lg p-2 w-20 h-20 flex items-center justify-center">
                          <img
                            src={item.image || '/api/placeholder/80/80'}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                          <button
                            onClick={() => handleRemove(item)}
                            className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-2 md:hidden"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <div className="px-4 py-2 w-12 text-center font-medium">{item.quantity}</div>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 flex md:justify-end items-center">
                        <div className="md:text-right">
                          <p className="font-medium text-gray-800">{formatPrice(item.price)}</p>
                          <p className="text-sm text-gray-500 md:hidden">per item</p>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-2 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-gray-500">Item Total:</span>
                        <p className="font-semibold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                        <button
                          onClick={() => handleRemove(item)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-6 hidden md:block"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className=" rounded-2xl shadow-sm p-6 sticky top-6">
                <h2 className="text-xl font-bold mb-6 pb-6 border-b border-gray-100">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Included</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl">{formatPrice(totalAmount)}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Including VAT</p>
                </div>

                <div className="space-y-4">
                  <button className="w-full py-3 bg-primary text-white font-medium rounded-lg  transition-colors">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleClearCart}
                    className="w-full py-3 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default CartPage;