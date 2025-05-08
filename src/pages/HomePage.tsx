import React, { useState, useEffect } from 'react';
import { useBehavior } from '../contexts/BehaviorContext';
import BehaviorList from '../components/behaviors/BehaviorList';
import BehaviorForm from '../components/behaviors/BehaviorForm';
import { Plus, RefreshCw, ExternalLink } from 'lucide-react';

const HomePage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { behaviors, fetchBehaviors, addBehavior, deleteBehavior, isLoading, error } = useBehavior();

  // Sort behaviors by number of items (most items first)
  const sortedBehaviors = [...behaviors].sort((a, b) => b.items.length - a.items.length).slice(0, 5);

  const handleAddBehavior = async (title: string, description: string, color: string) => {
    await addBehavior(title, description, color);
    setShowForm(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Featured Article Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">The Science of Self-Improvement</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <img
              src="https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg"
              alt="Person writing in journal"
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
          <div className="md:w-2/3">
            <p className="text-gray-600 mb-4">
              Self-improvement is a journey of continuous growth and learning. Research shows that tracking your behaviors
              and setting specific, measurable goals significantly increases your chances of success. Here are some
              key strategies backed by science:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Start small and build momentum</li>
              <li>Track your progress consistently</li>
              <li>Celebrate small wins</li>
              <li>Focus on systems over goals</li>
            </ul>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Recommended Resources:</h3>
              <div className="flex flex-col space-y-2">
                <a 
                  href="https://jamesclear.com/atomic-habits" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  Atomic Habits by James Clear <ExternalLink className="h-4 w-4 ml-1" />
                </a>
                <a 
                  href="https://www.sciencedirect.com/science/article/abs/pii/S0272735816300046" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                  The Science of Habit Formation <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Your Top Behaviors</h1>
          <p className="text-gray-600">Focusing on behaviors with the most improvement items</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => fetchBehaviors()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            aria-label="Refresh behaviors"
          >
            <RefreshCw className="h-5 w-5 inline mr-1" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Plus className="h-5 w-5 inline mr-1" />
            <span className="hidden sm:inline">New Behavior</span>
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {showForm && (
        <BehaviorForm 
          onSubmit={handleAddBehavior} 
          onCancel={() => setShowForm(false)} 
        />
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <BehaviorList
          behaviors={sortedBehaviors}
          onDelete={deleteBehavior}
        />
      )}
      
      {!isLoading && behaviors.length > 0 && sortedBehaviors.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No behaviors with items yet</h3>
          <p className="text-gray-600">
            Add items to your behaviors to see them appear on the home page.
          </p>
        </div>
      )}
      
      {!showForm && behaviors.length === 0 && !isLoading && (
        <div className="bg-indigo-50 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-indigo-800 mb-2">Welcome to Behavior Tracker!</h3>
          <p className="text-indigo-700 mb-4">
            This app helps you improve various behaviors by tracking specific improvement items for each one.
          </p>
          <p className="text-indigo-700 mb-4">
            Start by creating your first behavior using the "New Behavior" button above.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Plus className="h-4 w-4 inline mr-1" />
            Create Your First Behavior
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;