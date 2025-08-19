import React, { useState, useEffect } from 'react';
import { XIcon, SearchIcon, RefreshIcon, CheckIcon } from './icons';

interface AreaModalProps {
  onClose: () => void;
  onConfirm: (dongs: string[]) => void;
  initialSelection: string[];
}

interface AreaData {
  [key: string]: { [key: string]: string[] };
}

const MAX_SELECTIONS = 10;

const AreaModal: React.FC<AreaModalProps> = ({ onClose, onConfirm, initialSelection }) => {
  const [areaData, setAreaData] = useState<AreaData | null>(null);
  const [sidoList, setSidoList] = useState<string[]>([]);
  const [bundleSimilar, setBundleSimilar] = useState(false);
  const [showHelpTooltip, setShowHelpTooltip] = useState(false);
  const [selectedSido, setSelectedSido] = useState('서울');
  const [selectedSigungu, setSelectedSigungu] = useState('');
  const [selectedDongs, setSelectedDongs] = useState<string[]>(initialSelection);
  
  const [sigunguList, setSigunguList] = useState<string[]>([]);
  const [dongList, setDongList] = useState<string[]>([]);

  useEffect(() => {
    const fetchAreaData = async () => {
      try {
        const response = await fetch('/data/area.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: AreaData = await response.json();
        setAreaData(data);
        setSidoList(Object.keys(data));
      } catch (error) {
        console.error("Failed to fetch area data:", error);
      }
    };

    fetchAreaData();
  }, []);

  useEffect(() => {
    if (!areaData) return;
    const sigungus = Object.keys(areaData[selectedSido] || {});
    setSigunguList(sigungus);
    if (sigungus.length > 0) {
      setSelectedSigungu(sigungus[0]);
    } else {
      setSelectedSigungu('');
    }
  }, [selectedSido, areaData]);
  
  useEffect(() => {
    if (!areaData || !selectedSido || !selectedSigungu) {
      setDongList([]);
      return;
    }
      
    const dongs = areaData[selectedSido]?.[selectedSigungu] || [];
    const allOption = `${selectedSigungu.replace(/ 전체$/, '')} 전체`;
    
    if (!selectedSigungu.endsWith(' 전체')) {
      setDongList([allOption, ...dongs]);
    } else {
      setDongList(dongs);
    }
  }, [selectedSido, selectedSigungu, areaData]);
  
  const handleDongClick = (dong: string) => {
    setSelectedDongs(prev => {
      const isAllSelector = dong.endsWith(' 전체');
      const isSelected = prev.includes(dong);
      let newSelection = [...prev];

      if (isSelected) {
        return prev.filter(d => d !== dong);
      }

      if (isAllSelector) {
        const sigunguBase = dong.replace(/ 전체$/, '');
        newSelection = prev.filter(d => !d.startsWith(sigunguBase));
        newSelection.push(dong);
      } else {
        const allSelector = `${selectedSigungu.replace(/ 전체$/, '')} 전체`;
        newSelection = prev.filter(d => d !== allSelector);
        newSelection.push(dong);
      }

      if (newSelection.length > MAX_SELECTIONS) {
        // Optionally, show an alert to the user.
        return prev; // Do not add if limit is reached
      }
      
      return newSelection;
    });
  };
  
  const handleRemoveChip = (dong: string) => {
      setSelectedDongs(prev => prev.filter(d => d !== dong));
  };
  
  const handleReset = () => {
      setSelectedDongs([]);
  }

  if (!areaData) {
    return (
       <div 
        className="fixed inset-0 bg-white z-50 flex flex-col"
        aria-modal="true"
        role="dialog"
      >
        <header className="flex-shrink-0 flex items-center justify-between h-14 px-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">지역 선택</h2>
          <button 
            onClick={onClose} 
            aria-label="닫기" 
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </header>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-600">지역 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex flex-col"
      aria-modal="true"
      role="dialog"
    >
      <header className="flex-shrink-0 flex items-center justify-between h-14 px-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">지역 선택</h2>
        <button 
          onClick={onClose} 
          aria-label="닫기" 
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="relative flex-shrink-0 p-4 border-b border-gray-200 bg-gray-50">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="지역명을 검색하세요."
            className="w-full h-[46px] pl-4 pr-10 bg-white border border-gray-300 rounded-md text-sm text-neutral-900 caret-orange-500 focus:border-neutral-800 focus:outline-none focus:ring-0"
            aria-label="지역명 검색"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-neutral-900" />
          </div>
        </div>

        <div className="flex items-center justify-end mt-4">
          <label htmlFor="bundle-similar" className="flex items-center cursor-pointer select-none">
            <input
              type="checkbox"
              id="bundle-similar"
              checked={bundleSimilar}
              onChange={() => setBundleSimilar(prev => !prev)}
              className="w-4 h-4 mr-2 border-gray-300 rounded text-orange-500 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">
              유사동묶기
            </span>
          </label>
          <button
              type="button"
              aria-label="유사동묶기 도움말"
              onClick={() => setShowHelpTooltip(prev => !prev)}
              className="flex items-center justify-center w-5 h-5 ml-2 bg-[#d2d2d2] rounded-full text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
              ?
          </button>
        </div>
        
        {showHelpTooltip && (
          <div 
            className="absolute left-4 right-4 top-full bg-white border border-gray-200 rounded-lg shadow-xl p-4 z-20"
            role="tooltip"
          >
              <button
                  onClick={() => setShowHelpTooltip(false)}
                  aria-label="도움말 닫기"
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                  <XIcon className="w-5 h-5" />
              </button>
              <p className="text-sm text-gray-800 pr-6">
                  우리동네 유사동을 대표동으로 한 번에 선택할 수 있어요.
              </p>
              <p className="mt-2 text-sm text-orange-500 font-semibold">
                  예) 도곡1동, 도곡2동 → 도곡동
              </p>
          </div>
        )}
      </div>

      <main className="flex-grow flex overflow-hidden text-sm">
        {/* Column 1: Sido */}
        <div className="w-[30%] border-r border-gray-200 flex flex-col bg-gray-50">
          <div className="flex-shrink-0 text-center font-bold py-3 border-b border-gray-200 text-gray-800 bg-gray-50">시·도</div>
          <ul className="overflow-y-auto">
            {sidoList.map(sido => (
              <li key={sido}>
                <button
                  type="button"
                  onClick={() => setSelectedSido(sido)}
                  className={`w-full text-left px-4 py-3 transition-colors ${selectedSido === sido ? 'bg-orange-500 text-white font-bold' : 'hover:bg-gray-200 text-gray-800'}`}
                >
                  {sido}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Sigungu */}
        <div className="w-[35%] border-r border-gray-200 flex flex-col bg-white">
          <div className="flex-shrink-0 text-center font-bold py-3 border-b border-gray-200 text-gray-800 bg-gray-50">시·구·군</div>
          <ul className="overflow-y-auto">
            {sigunguList.map(sigungu => (
              <li key={sigungu}>
                <button
                  type="button"
                  onClick={() => setSelectedSigungu(sigungu)}
                  className={`w-full text-left px-4 py-3 transition-colors ${selectedSigungu === sigungu ? 'bg-orange-100 text-orange-500 font-bold' : 'hover:bg-gray-50 text-gray-800'}`}
                >
                  {sigungu}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Dong */}
        <div className="w-[35%] flex flex-col bg-white">
          <div className="flex-shrink-0 text-center font-bold py-3 border-b border-gray-200 text-gray-800 bg-gray-50">동·읍·면</div>
          <ul className="overflow-y-auto">
            {dongList.map(dong => {
              const isSelected = selectedDongs.includes(dong);
              return (
                <li key={dong}>
                   <button 
                      type="button" 
                      onClick={() => handleDongClick(dong)}
                      className={`w-full flex justify-between items-center text-left px-4 py-3 hover:bg-gray-50 ${isSelected ? 'text-orange-500 font-bold' : 'text-gray-800'}`}
                    >
                    <span>{dong}</span>
                    {isSelected && <CheckIcon className="w-4 h-4 text-orange-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

       {/* Selection Summary */}
      {selectedDongs.length > 0 && (
        <div className="flex-shrink-0 p-4 space-y-3 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] min-h-[100px]">
          <div className="flex justify-between items-center">
            <p className="text-sm">
              <span className="text-orange-500 font-bold">{selectedDongs.length}</span>
              <span className="text-gray-500">/{MAX_SELECTIONS}</span>
            </p>
            <button 
              onClick={handleReset}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
              <RefreshIcon className="w-4 h-4 mr-1" />
              초기화
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedDongs.map(dong => (
              <div key={dong} className="bg-orange-50 text-orange-600 text-sm font-medium px-2 py-1 rounded flex items-center">
                <span>{dong}</span>
                <button 
                  onClick={() => handleRemoveChip(dong)}
                  aria-label={`${dong} 삭제`}
                  className="ml-1.5 text-orange-400 hover:text-orange-600"
                 >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <footer className="flex-shrink-0 p-4 bg-white">
         <div className="flex items-center space-x-3">
             <button 
                onClick={onClose}
                type="button"
                className="flex-1 border border-gray-300 bg-white text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
               취소
             </button>
             <button
                onClick={() => onConfirm(selectedDongs)}
                type="button"
                className="flex-1 bg-orange-500 text-white font-bold py-3 px-4 rounded-lg shadow-sm hover:bg-orange-600 transition-colors"
             >
              확인
            </button>
         </div>
      </footer>
    </div>
  );
};

export default AreaModal;