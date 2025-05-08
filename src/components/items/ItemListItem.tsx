import React, { useState } from 'react';
import { ImprovementItem } from '../../types';
import { Trash2, Edit2, CheckCircle, Circle, X, Check } from 'lucide-react';

interface ItemListItemProps {
  item: ImprovementItem;
  onUpdate: (id: string, text: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  behaviorColor: string;
}

const ItemListItem: React.FC<ItemListItemProps> = ({ item, onUpdate, onDelete, behaviorColor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  
  const handleToggleComplete = () => {
    onUpdate(item.id, item.text, !item.completed);
  };
  
  const handleEdit = () => {
    setEditText(item.text);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(item.id, editText, item.completed);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditText(item.text);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(item.id);
    }
  };

  return (
    <li className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${item.completed ? 'bg-gray-50' : ''}`}>
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            autoFocus
          />
          <div className="ml-3 flex items-center">
            <button
              onClick={handleSave}
              className="p-1 text-green-600 hover:text-green-800 transition-colors duration-200 mr-1"
              aria-label="Save"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1 text-red-600 hover:text-red-800 transition-colors duration-200"
              aria-label="Cancel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-grow">
            <button
              onClick={handleToggleComplete}
              className={`p-1 text-${behaviorColor}-600 hover:text-${behaviorColor}-800 transition-colors duration-200`}
              aria-label={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {item.completed ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </button>
            <span 
              className={`ml-3 ${
                item.completed 
                  ? 'text-gray-500 line-through' 
                  : 'text-gray-800'
              }`}
            >
              {item.text}
            </span>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 mr-1"
              aria-label="Edit item"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
              aria-label="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ItemListItem;