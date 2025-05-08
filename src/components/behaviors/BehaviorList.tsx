import React from 'react';
import { Behavior } from '../../types';
import BehaviorCard from './BehaviorCard';

interface BehaviorListProps {
  behaviors: Behavior[];
  onDelete: (id: string) => void;
}

const BehaviorList: React.FC<BehaviorListProps> = ({ behaviors, onDelete }) => {
  if (behaviors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No behaviors yet</h3>
        <p className="text-gray-600">
          Create your first behavior to start tracking your improvement journey!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {behaviors.map((behavior) => (
        <BehaviorCard
          key={behavior.id}
          behavior={behavior}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BehaviorList;