export interface FiltersProps {
    onFilter: (filters: {
      date: string;
      category: string;
      source: string;
    }) => void;
  }