import React, { useState } from "react";
import UserPreferencesModal from "../UserPreferencesComponent/UserPreferencesComponent";
import Button from "../ButtonComponent/ButtonComponent";
import { PageTitle, Preference } from "../../data/constant";

const Navbar: React.FC = () => {
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  const handleSavePreferences = (preferences: {
    sources: string[];
    categories: string[];
    authors: string[];
  }) => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setIsPreferencesModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-between bg-white border-b border-gray-200 fixed w-full z-10 h-16 px-8">
        <div className="flex items-center h-full">
          <a href="/" className="text-2xl font-bold text-black">
            {PageTitle}
          </a>
        </div>
        <div className="flex items-center h-full">
          <Button
            onClick={() => setIsPreferencesModalOpen(true)}
            className="whitespace-nowrap"
          >
            {Preference}
          </Button>
        </div>
      </div>
      <UserPreferencesModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
        onSave={handleSavePreferences}
      />
    </>
  );
};

export default Navbar;
