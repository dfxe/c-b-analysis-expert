import React from "react";

export default function InputAdd() {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor="email">
        {" "}
        Email{" "}
      </label>

      <input
        className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
        id="email"
        type="email"
        placeholder="Email"
      />

      <button
        className="absolute p-2 text-white bg-blue-600 rounded-full -translate-y-1/2 top-1/2 right-4"
        type="button"
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </div>
  );
}
