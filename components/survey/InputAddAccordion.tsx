import React from "react";
import { useDetails } from "../contexts/DetailsProvider";
import NumericInput from "./NumericInput";

export default function InputAddAccordion() {
  const details = useDetails();
  return (
    <nav className="flex flex-col space-y-1 ">
      <details className="group">
        <summary className="flex border-2 items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium"> Hardware </span>

          <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>

        <nav className="flex flex-col mt-2">
          <div className="flex row justify-around">
            <input
              type="text"
              className="block border-2 px-2 py-2 w-1/2 mr-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
              value="Server"
              onChange={(e) =>
                details.dispatch({
                  type: "change_field_value",
                  nextTitle: e.target.value,
                })
              }
            />
            <NumericInput />
          </div>
        </nav>

        <div className="flex row justify-around mt-4">
          <button className="relative text-indigo-600 font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">
            Add field
          </button>
          <button className="relative text-indigo-600 font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100">
            Remove Field
          </button>
        </div>
      </details>
    </nav>
  );
}
