import React from 'react';
import type { FilterCategory } from '../types';
import Chip from './Chip';
import { PlusIcon, XIcon } from './icons';

interface FilterSectionProps {
  category: FilterCategory;
  selectedIds: string[];
  onToggle: (optionId: string) => void;
  onAdd?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ category, selectedIds, onToggle, onAdd }) => {
  const selectionCount = selectedIds.length;

  return (
    <div className="py-6 px-4 border-b border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-800 flex items-center">
          {category.title}
          <span className={`ml-2 font-semibold ${selectionCount > 0 ? 'text-orange-500' : 'text-gray-400'}`}>
            ({selectionCount}/{category.limit})
          </span>
        </h2>
      </div>
       {category.id === 'area' && selectedIds.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedIds.map(id => (
              <div key={id} className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full flex items-center">
                <span>{id}</span>
                <button 
                  onClick={() => onToggle(id)} 
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label={`${id} 지역 삭제`}
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      <div className="flex flex-wrap gap-2">
        {category.options.map((option) => (
          <Chip
            key={option.id}
            label={option.label}
            isSelected={selectedIds.includes(option.id)}
            onClick={() => onToggle(option.id)}
          />
        ))}
      </div>
      {category.id === 'area' && (
        <button
          type="button"
          className="w-full flex items-center justify-center mt-4 py-2.5 px-4 border border-gray-300 rounded-lg text-gray-600 text-sm hover:bg-gray-50 transition-colors"
          onClick={onAdd}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">{selectedIds.length > 0 ? '수정하기' : '추가하기'}</span>
        </button>
      )}
    </div>
  );
};

export default FilterSection;