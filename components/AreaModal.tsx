import React from 'react';
import { XIcon, SearchIcon } from './icons';

interface AreaModalProps {
  onClose: () => void;
}

const AreaModal: React.FC<AreaModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex flex-col"
      aria-modal="true"
      role="dialog"
    >
      <header className="flex items-center justify-between h-14 px-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">지역선택</h2>
        <button 
          onClick={onClose} 
          aria-label="닫기" 
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="p-4 border-b border-gray-200">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="지역명을 검색하세요."
            className="w-full h-12 pl-4 pr-10 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 text-base"
            aria-label="지역명 검색"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      <main className="flex-grow overflow-y-auto">
        {/* TODO: 지역 선택 리스트 UI 구현 */}
      </main>
    </div>
  );
};

export default AreaModal;