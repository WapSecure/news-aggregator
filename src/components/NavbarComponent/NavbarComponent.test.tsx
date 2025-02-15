import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "./NavbarComponent";

test("renders navbar and opens preferences modal", () => {
  render(<Navbar />);

  expect(screen.getByText("News Aggregator")).toBeInTheDocument();

  const preferencesButton = screen.getByText("Preferences");
  fireEvent.click(preferencesButton);

  expect(screen.getByText("Customize Your News Feed")).toBeInTheDocument();
});