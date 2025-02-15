import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./SelectComponent";

test("renders select component and handles change", () => {
  const handleChange = jest.fn();
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  render(
    <Select
      label="Test Select"
      value="option1"
      onChange={handleChange}
      options={options}
    />
  );

  // Check if the label is rendered
  expect(screen.getByText("Test Select")).toBeInTheDocument();

  // Check if the options are rendered
  expect(screen.getByText("Option 1")).toBeInTheDocument();
  expect(screen.getByText("Option 2")).toBeInTheDocument();

  // Simulate a change event
  const select = screen.getByRole("combobox");
  fireEvent.change(select, { target: { value: "option2" } });

  // Check if the change handler was called
  expect(handleChange).toHaveBeenCalled();
});