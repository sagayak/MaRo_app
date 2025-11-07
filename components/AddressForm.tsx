import React from 'react';
import { Address } from '../types';

interface AddressFormProps {
  address: Address;
  setAddress: (address: Address) => void;
  isFormValid: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({ address, setAddress, isFormValid }) => {
  const towers = Array.from({ length: 18 }, (_, i) => i + 1);
  const floors = Array.from({ length: 14 }, (_, i) => i + 1);
  const appartments = Array.from({ length: 6 }, (_, i) => (i + 1).toString().padStart(3, '0'));

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Delivery Address</h3>
      <div>
        <label htmlFor="tower" className="block text-sm font-medium text-gray-700">Tower</label>
        <select id="tower" value={address.tower} onChange={e => setAddress({ ...address, tower: e.target.value })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
          <option value="">Select Tower</option>
          {towers.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Floor</label>
        <select id="floor" value={address.floor} onChange={e => setAddress({ ...address, floor: e.target.value })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
          <option value="">Select Floor</option>
          {floors.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="appartment" className="block text-sm font-medium text-gray-700">Appartment</label>
        <select id="appartment" value={address.appartment} onChange={e => setAddress({ ...address, appartment: e.target.value })} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
          <option value="">Select Appartment</option>
          {appartments.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      {!isFormValid && <p className="text-red-500 text-xs mt-1">Please fill out all address fields.</p>}
    </div>
  );
};

export default AddressForm;
