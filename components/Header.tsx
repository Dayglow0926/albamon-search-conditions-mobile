import React from 'react';
import { ChevronLeftIcon } from './icons';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  const handleBack = () => {
    // In a real app with a router, this would be something like router.back()
    window.history.back();
  };

  return (
    <header className="sticky top-0 bg-white z-10 border-b border-gray-200">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            aria-label="뒤로가기"
            className="h-full flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-800 ml-2">검색조건설정</h1>
        </div>
        <button
          onClick={onReset}
          aria-label="필터 초기화"
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          초기화
        </button>
      </div>
    </header>
  );
};

export default Header;
