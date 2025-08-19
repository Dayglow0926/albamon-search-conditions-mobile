import React from 'react';

interface ChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, isSelected, onClick }) => {
  const baseClasses = 'px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500';
  const selectedClasses = 'bg-orange-500 text-white border-orange-500';
  const unselectedClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {label}
    </button>
  );
};

export default Chip;