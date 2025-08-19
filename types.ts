export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterCategory {
  id: string;
  title: string;
  options: FilterOption[];
  limit: number;
}

export interface FiltersStore {
  selectedFilters: Record<string, string[]>;
  toggleFilter: (categoryId: string, optionId: string, limit: number) => void;
  resetFilters: () => void;
  getSelectionCount: (categoryId: string) => number;
  setFilters: (categoryId: string, optionIds: string[]) => void;
}