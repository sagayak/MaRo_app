import React, { useState } from 'react';
import { CartItem, Address } from '../types';
import { CloseIcon, MinusIcon, PlusIcon, CheckCircleIcon, ExclamationIcon } from './icons';
import AddressForm from './AddressForm';

interface CartViewProps {
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onConfirmOrder: (order: { cart: CartItem[], address: Address, total: number }) => Promise<void>;
  orderStatus: 'idle' | 'placing' | 'success' | 'error';
  errorMessage: string;
  onPlaceAnotherOrder: () => void;
  order: { cart: CartItem[], address: Address, total: number };
  orderId: string;
}


const CartView: React.FC<CartViewProps> = ({ cart, totalPrice, onClose, onUpdateQuantity, onConfirmOrder, orderStatus, errorMessage, onPlaceAnotherOrder, order, orderId }) => {
  const [address, setAddress] = useState<Address>({ tower: '', floor: '', appartment: '' });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // FIX: Coerce the result to a boolean. The original expression resulted in a string,
  // which caused a type error when passed to props expecting a boolean.
  const isFormValid = !!(address.tower && address.floor && address.appartment);

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    if(isFormValid) {
        onConfirmOrder({ cart, address, total: totalPrice });
    }
  };

  const renderContent = () => {
    switch (orderStatus) {
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4"/>
            <h2 className="text-2xl font-bold text-gray-800">Order Placed!</h2>
            <p className="text-gray-600 mt-2">Your delicious meal is on its way. Thank you!</p>
            <div className="mt-4 text-sm text-gray-500">
              <p>Order ID: <span className="font-semibold text-gray-700">{orderId}</span></p>
            </div>
            <button
              onClick={onPlaceAnotherOrder}
              className="mt-8 w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Place Another Order
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8">
            <ExclamationIcon className="w-16 h-16 text-red-500 mb-4"/>
            <h2 className="text-2xl font-bold text-gray-800">Oops!</h2>
            <p className="text-gray-600 mt-2">Something went wrong while placing your order.</p>
            <p className="text-red-600 text-sm mt-2 bg-red-100 p-2 rounded-md">{errorMessage}</p>
            <button
              onClick={onPlaceAnotherOrder}
              className="mt-8 w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case 'placing':
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600"></div>
                <h2 className="text-xl font-semibold mt-4">Placing Your Order...</h2>
            </div>
        );
      case 'idle':
      default:
        return (
          <>
            <div className="p-4 flex-grow overflow-y-auto">
              <h2 className="text-xl font-bold border-b pb-2">Your Order</h2>
              <div className="space-y-4 mt-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">₹{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full bg-gray-200"><MinusIcon className="w-4 h-4"/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full bg-gray-200"><PlusIcon className="w-4 h-4"/></button>
                    </div>
                  </div>
                ))}
              </div>
              <AddressForm address={address} setAddress={setAddress} isFormValid={isFormValid || !attemptedSubmit}/>
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!isFormValid && attemptedSubmit}
                className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Confirm Order
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-end justify-center">
      <div className="bg-gray-100 rounded-t-2xl w-full max-w-lg h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold">
            {orderStatus === 'idle' ? 'Cart' : 'Order Status'}
          </h2>
          <button onClick={orderStatus === 'idle' || orderStatus === 'error' ? onClose : undefined} className="p-2 rounded-full hover:bg-gray-200">
            <CloseIcon className="w-6 h-6"/>
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default CartView;