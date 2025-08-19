import { create } from 'zustand';
import type { FiltersStore } from '../types';

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  selectedFilters: {},
  
  getSelectionCount: (categoryId: string) => {
    return get().selectedFilters[categoryId]?.length || 0;
  },

  toggleFilter: (categoryId: string, optionId: string, limit: number) => {
    set((state) => {
      const currentSelection = state.selectedFilters[categoryId] || [];
      const isSelected = currentSelection.includes(optionId);
      let newSelection;

      if (isSelected) {
        newSelection = currentSelection.filter((id) => id !== optionId);
      } else {
        if (currentSelection.length >= limit) {
          // Limit reached, do not add. Maybe show a toast notification in a real app.
          return state;
        }
        newSelection = [...currentSelection, optionId];
      }
      
      const newSelectedFilters = {
        ...state.selectedFilters,
        [categoryId]: newSelection,
      };

      // Clean up empty arrays
      if (newSelection.length === 0) {
        delete newSelectedFilters[categoryId];
      }

      return { selectedFilters: newSelectedFilters };
    });
  },

  resetFilters: () => {
    set({ selectedFilters: {} });
  },

  setFilters: (categoryId: string, optionIds: string[]) => {
    set((state) => {
      if (optionIds.length === 0) {
        const newSelectedFilters = { ...state.selectedFilters };
        delete newSelectedFilters[categoryId];
        return { selectedFilters: newSelectedFilters };
      }
      return {
        selectedFilters: {
          ...state.selectedFilters,
          [categoryId]: optionIds,
        },
      };
    });
  }
}));