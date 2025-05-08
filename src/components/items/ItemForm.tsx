import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ItemFormProps {
  onSubmit: (text: string) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!text.trim()) {
      setError('Item text is required');
      return;
    }
    
    onSubmit(text);
    
    // Reset form
    setText('');
    setError('');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Add New Improvement Item</h3>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setError('');
            setText(e.target.value);
          }}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          placeholder="Enter a new improvement item..."
        />
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ItemForm;