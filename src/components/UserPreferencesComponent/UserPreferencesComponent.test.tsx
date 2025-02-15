import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserPreferencesModal from "./UserPreferencesComponent";

test("renders user preferences modal and handles save", () => {
  const handleSave = jest.fn();
  const handleClose = jest.fn();

  render(
    <UserPreferencesModal
      isOpen={true}
      onClose={handleClose}
      onSave={handleSave}
    />
  );

  expect(screen.getByText("Customize Your News Feed")).toBeInTheDocument();


  const sourcesSelect = screen.getByLabelText("Preferred Sources");
  fireEvent.change(sourcesSelect, { target: { value: "NewsAPI" } });

  const categoriesSelect = screen.getByLabelText("Preferred Categories");
  fireEvent.change(categoriesSelect, { target: { value: "technology" } });

  const authorsInput = screen.getByPlaceholderText("Enter authors separated by commas");
  fireEvent.change(authorsInput, { target: { value: "Author1,Author2" } });

  const saveButton = screen.getByText("Save Preferences");
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalledWith({
    sources: ["NewsAPI"],
    categories: ["technology"],
    authors: ["Author1", "Author2"],
  });
});