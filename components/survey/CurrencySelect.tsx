import React from "react";
import { useDetails } from "../contexts/DetailsProvider";
export default function CurrencySelect() {
  const details = useDetails();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const currencies = [
    {
      value: "USD",
      label: "$",
    },
    {
      value: "EUR",
      label: "€",
    },
    {
      value: "GBP",
      label: "£",
    },
    {
      value: "RON",
      label: "RON",
    },
  ];

  const handleChange = (item: string) => {
    details.dispatch({
      type: "changed_currency",
      nextAction: item,
    });

    setShowDropdown(!showDropdown);
  };

  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-full inline-flex justify-between bg-white border rounded-md"
    >
      <div className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-l-md">
        {details.state.currency}
      </div>

      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center justify-center h-full px-2 text-gray-600 border-l border-gray-100 hover:text-gray-700 rounded-r-md hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          hidden={showDropdown}
          className="absolute right-0 z-10 w-56 mt-4 bg-white border border-gray-100 shadow-lg origin-top-right rounded-md"
          role="menu"
        >
          <div className="py-2 flow-root">
            <div className="-my-2 divide-y divide-gray-100">
              <ul className="p-2">
                {currencies.map((item, i) => (
                  <li
                    onClick={() => handleChange(item.label)}
                    key={item.value + i}
                    className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                    role="menuitem"
                  >
                    {item.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
