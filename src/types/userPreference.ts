export interface UserPreferencesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (preferences: {
      sources: string[];
      categories: string[];
      authors: string[];
    }) => void;
  }
  