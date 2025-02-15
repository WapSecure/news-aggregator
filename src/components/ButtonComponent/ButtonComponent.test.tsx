import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./ButtonComponent";

test("renders button with correct text and handles click", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  const button = screen.getByText("Click Me");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("renders disabled button", () => {
  render(<Button disabled>Disabled Button</Button>);

  const button = screen.getByText("Disabled Button");
  expect(button).toBeDisabled();
});