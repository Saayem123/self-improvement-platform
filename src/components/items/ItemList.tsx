import React from 'react';
import { ImprovementItem } from '../../types';
import ItemListItem from './ItemListItem';

interface ItemListProps {
  items: ImprovementItem[];
  onUpdate: (id: string, text: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  behaviorColor: string;
}

const ItemList: React.FC<ItemListProps> = ({ items, onUpdate, onDelete, behaviorColor }) => {
  // Sort items: incomplete first, then by creation date (newest first)
  const sortedItems = [...items].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt - a.createdAt;
  });

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600">
          No improvement items yet. Add your first item above!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {sortedItems.map((item) => (
          <ItemListItem
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            behaviorColor={behaviorColor}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;