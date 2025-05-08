import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBehavior } from '../contexts/BehaviorContext';
import ItemForm from '../components/items/ItemForm';
import ItemList from '../components/items/ItemList';
import { ArrowLeft, Trash2 } from 'lucide-react';

const BehaviorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { behaviors, fetchBehaviors, addItem, updateItem, deleteItem, deleteBehavior, isLoading, error } = useBehavior();
  
  useEffect(() => {
    fetchBehaviors();
  }, [fetchBehaviors]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Find the behavior
  const behavior = behaviors.find(b => b.id === id);
  
  if (!behavior) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          Behavior not found. It may have been deleted.
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 inline mr-1" />
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleAddItem = (text: string) => {
    addItem(behavior.id, text);
  };
  
  const handleUpdateItem = (itemId: string, text: string, completed: boolean) => {
    updateItem(behavior.id, itemId, text, completed);
  };
  
  const handleDeleteItem = (itemId: string) => {
    deleteItem(behavior.id, itemId);
  };
  
  const handleDeleteBehavior = () => {
    if (window.confirm('Are you sure you want to delete this behavior and all its items?')) {
      deleteBehavior(behavior.id);
      navigate('/');
    }
  };
  
  // Calculate completion percentage
  const completedItems = behavior.items.filter(item => item.completed).length;
  const totalItems = behavior.items.length;
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Home
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">{behavior.title}</h1>
            <p className="text-gray-600 mb-4">{behavior.description}</p>
          </div>
          
          <button
            onClick={handleDeleteBehavior}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-600 bg-white hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
          >
            <Trash2 className="h-4 w-4 inline mr-1" />
            Delete Behavior
          </button>
        </div>
        
        {/* Progress bar */}
        {totalItems > 0 && (
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Overall Progress</span>
              <span className={`font-medium text-${behavior.color}-600`}>{completionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-${behavior.color}-500 h-3 rounded-full transition-all duration-500 ease-out`} 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {completedItems} of {totalItems} items completed
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <ItemForm onSubmit={handleAddItem} />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-4">Improvement Items</h2>
      
      <ItemList
        items={behavior.items}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
        behaviorColor={behavior.color}
      />
    </div>
  );
};

export default BehaviorDetailPage;