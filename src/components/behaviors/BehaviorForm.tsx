import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface BehaviorFormProps {
  onSubmit: (title: string, description: string, color: string) => void;
  onCancel: () => void;
}

const BehaviorForm: React.FC<BehaviorFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('indigo');
  const [error, setError] = useState('');

  const colors = [
    { name: 'indigo', label: 'Indigo' },
    { name: 'blue', label: 'Blue' },
    { name: 'green', label: 'Green' },
    { name: 'yellow', label: 'Yellow' },
    { name: 'red', label: 'Red' },
    { name: 'purple', label: 'Purple' },
    { name: 'pink', label: 'Pink' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    onSubmit(title, description, color);
    
    // Reset form
    setTitle('');
    setDescription('');
    setColor('indigo');
    setError('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Create New Behavior</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close form"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setError('');
              setTitle(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="e.g., Daily Exercise"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Describe this behavior..."
          ></textarea>
        </div>
        
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {colors.map((clr) => (
              <button
                key={clr.name}
                type="button"
                onClick={() => setColor(clr.name)}
                className={`w-8 h-8 rounded-full bg-${clr.name}-500 flex items-center justify-center transition-all duration-200 ${
                  color === clr.name ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                }`}
                aria-label={`Select ${clr.label} color`}
              ></button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 inline mr-1" />
            Create Behavior
          </button>
        </div>
      </form>
    </div>
  );
};

export default BehaviorForm;