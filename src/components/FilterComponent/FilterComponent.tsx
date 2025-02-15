import React, { useState, useRef, useEffect } from "react";
import Button from "../ButtonComponent/ButtonComponent";
import Select from "../SelectComponent/SelectComponent";
import { FiltersProps } from "../../types/filter";

const Filters: React.FC<FiltersProps> = ({ onFilter }) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleFilter = () => {
    onFilter({ date, category, source });
    setIsOpen(false);
  };

  const handleReset = () => {
    setDate("");
    setCategory("");
    setSource("");
    onFilter({ date: "", category: "", source: "" });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={filterRef}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="whitespace-nowrap min-w-[120px]"
      >
        Filter News
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white p-4 rounded-lg shadow-md w-64 z-10">
          <h2 className="text-lg font-semibold mb-4">Filter Articles</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "", label: "All Categories" },
                { value: "technology", label: "Technology" },
                { value: "business", label: "Business" },
                { value: "sports", label: "Sports" },
                { value: "health", label: "Health" },
              ]}
            />

            <Select
              label="Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              options={[
                { value: "", label: "All Sources" },
                { value: "NewsAPI", label: "NewsAPI" },
                { value: "The Guardian", label: "The Guardian" },
                { value: "New York Times", label: "New York Times" },
              ]}
            />

            <div className="flex w-full justify-between gap-2">
              <Button onClick={handleFilter} className="w-full">
                Apply
              </Button>
              <Button
                onClick={handleReset}
                className="bg-gray-300 text-black hover:bg-gray-400 w-full"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
