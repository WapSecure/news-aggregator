import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "./FilterComponent";

test("renders filter component and handles filter and reset", () => {
  const handleFilter = jest.fn();
  render(<Filters onFilter={handleFilter} />);

  const filterButton = screen.getByText("Filter News");
  fireEvent.click(filterButton);

  expect(screen.getByText("Filter Articles")).toBeInTheDocument();

  const dateInput = screen.getByLabelText("Date");
  fireEvent.change(dateInput, { target: { value: "2023-10-01" } });

  const categorySelect = screen.getByLabelText("Category");
  fireEvent.change(categorySelect, { target: { value: "technology" } });

  const sourceSelect = screen.getByLabelText("Source");
  fireEvent.change(sourceSelect, { target: { value: "NewsAPI" } });

  const applyButton = screen.getByText("Apply");
  fireEvent.click(applyButton);

  expect(handleFilter).toHaveBeenCalledWith({
    date: "2023-10-01",
    category: "technology",
    source: "NewsAPI",
  });

  const resetButton = screen.getByText("Reset");
  fireEvent.click(resetButton);

  expect(handleFilter).toHaveBeenCalledWith({
    date: "",
    category: "",
    source: "",
  });
});
