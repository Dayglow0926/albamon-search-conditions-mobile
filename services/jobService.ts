// This is a mock service to simulate API calls.

export const fetchJobCount = async (filters: Record<string, string[]>): Promise<number> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));

  const totalFilters = Object.values(filters).flat().length;
  
  // Simulate a decreasing count as more filters are applied
  const baseCount = 12345;
  const filteredCount = Math.max(0, baseCount - totalFilters * (1500 + Math.random() * 500) - Math.random() * 1000);
  
  return Math.floor(filteredCount);
};