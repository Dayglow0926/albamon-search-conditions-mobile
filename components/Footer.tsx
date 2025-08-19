import React from 'react';
import { ResetIcon } from './icons';

interface FooterProps {
  jobCount: number | null;
  isLoading: boolean;
  onReset: () => void;
  onShowResults: () => void;
}

const Footer: React.FC<FooterProps> = ({ jobCount, isLoading, onReset, onShowResults }) => {
  const formattedCount = jobCount?.toLocaleString() ?? '...';
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-10">
      <div className="flex items-center justify-between space-x-3">
        <button 
          onClick={onReset}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ResetIcon className="w-5 h-5" />
          <span className="text-sm font-medium">초기화</span>
        </button>
        <button
          onClick={onShowResults}
          disabled={isLoading || jobCount === 0}
          className="flex-grow bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading 
            ? '검색 중...' 
            : `${formattedCount}건 결과보기`
          }
        </button>
      </div>
    </footer>
  );
};

export default Footer;