import React, { useState } from "react";
import Button from "../ButtonComponent/ButtonComponent";
import { UserPreferencesModalProps } from "../../types/userPreference";

const UserPreferencesModal: React.FC<UserPreferencesModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [sources, setSources] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);

  const handleSave = () => {
    onSave({ sources, categories, authors });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Customize Your News Feed</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Sources
            </label>
            <select
              multiple
              value={sources}
              onChange={(e) =>
                setSources(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="NewsAPI">NewsAPI</option>
              <option value="The Guardian">The Guardian</option>
              <option value="New York Times">New York Times</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Categories
            </label>
            <select
              multiple
              value={categories}
              onChange={(e) =>
                setCategories(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="technology">Technology</option>
              <option value="business">Business</option>
              <option value="sports">Sports</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preferred Authors
            </label>
            <input
              type="text"
              value={authors.join(",")}
              onChange={(e) => setAuthors(e.target.value.split(","))}
              placeholder="Enter authors separated by commas"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex gap-4 w-full">
            <Button onClick={handleSave} className="flex-1">
              Save Preferences
            </Button>
            <Button
              onClick={onClose}
              className="bg-gray-300 text-black hover:bg-gray-400 flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreferencesModal;
