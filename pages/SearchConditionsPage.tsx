import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FilterSection from '../components/FilterSection';
import AreaModal from '../components/AreaModal';
import { useFiltersStore } from '../store/filtersStore';
import { FILTER_CATEGORIES } from '../constants';
import { fetchJobCount } from '../services/jobService';

const SearchConditionsPage: React.FC = () => {
  const { selectedFilters, toggleFilter, resetFilters } = useFiltersStore();
  const [jobCount, setJobCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);

  const handleToggleFilter = (categoryId: string, optionId: string) => {
    const category = FILTER_CATEGORIES.find(c => c.id === categoryId);
    if (category) {
      toggleFilter(categoryId, optionId, category.limit);
    }
  };

  const updateJobCount = useCallback(async () => {
    setIsLoading(true);
    const count = await fetchJobCount(selectedFilters);
    setJobCount(count);
    setIsLoading(false);
  }, [selectedFilters]);

  useEffect(() => {
    updateJobCount();
  }, [updateJobCount]);

  useEffect(() => {
    if (isAreaModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAreaModalOpen]);
  
  const handleShowResults = () => {
    alert(`Showing ${jobCount} results for filters: \n${JSON.stringify(selectedFilters, null, 2)}`);
  };

  const openAreaModal = () => setIsAreaModalOpen(true);
  const closeAreaModal = () => setIsAreaModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onReset={resetFilters} />
      <main className="flex-grow pb-32"> {/* Padding to prevent content from being hidden by the fixed footer */}
        <div 
          className="p-4 bg-gray-100 text-sm text-center font-normal"
          style={{ color: '#6a6a6a' }}
        >
          모든 채용메뉴에 공통 반영됩니다.
        </div>
        {FILTER_CATEGORIES.map((category) => (
          <FilterSection
            key={category.id}
            category={category}
            selectedIds={selectedFilters[category.id] || []}
            onToggle={(optionId) => handleToggleFilter(category.id, optionId)}
            onAdd={openAreaModal}
          />
        ))}
      </main>
      <Footer 
        jobCount={jobCount}
        isLoading={isLoading}
        onReset={resetFilters}
        onShowResults={handleShowResults}
      />
      {isAreaModalOpen && <AreaModal onClose={closeAreaModal} />}
    </div>
  );
};

export default SearchConditionsPage;