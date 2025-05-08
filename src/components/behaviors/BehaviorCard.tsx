import React from 'react';
import { Link } from 'react-router-dom';
import { Behavior } from '../../types';
import { Trash2, ArrowRight, CheckCircle } from 'lucide-react';

interface BehaviorCardProps {
  behavior: Behavior;
  onDelete: (id: string) => void;
}

const BehaviorCard: React.FC<BehaviorCardProps> = ({ behavior, onDelete }) => {
  const { id, title, description, color, items } = behavior;
  
  // Calculate completion percentage
  const completedItems = items.filter(item => item.completed).length;
  const totalItems = items.length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  
  // Determine border color based on behavior color
  const borderColor = `border-${color}-500`;
  const bgColor = `bg-${color}-50`;
  const progressColor = `bg-${color}-500`;
  
  // Handle delete with confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this behavior and all its items?')) {
      onDelete(id);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border-l-4 ${borderColor}`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label="Delete behavior"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{completedItems} of {totalItems} items</span>
            <span className={`font-medium text-${color}-600`}>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`${progressColor} h-2 rounded-full transition-all duration-500 ease-out`} 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span>{completedItems} completed</span>
          </div>
          
          <Link
            to={`/behavior/${id}`}
            className={`inline-flex items-center px-3 py-1 rounded text-sm font-medium text-${color}-700 bg-${color}-100 hover:bg-${color}-200 transition-colors duration-200`}
          >
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BehaviorCard;