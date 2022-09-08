import React from "react";

export default function InputAddAccordion() {
  return (
    <nav className="flex flex-col space-y-1">
      <a
        href=""
        className="block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
      >
        General
      </a>

      <details className="group">
        <summary className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium"> Teams </span>

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

        <nav className="flex flex-col mt-2 ml-8 space-y-1">
          <a
            href=""
            className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Banned Users
          </a>

          <a
            href=""
            className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Calendar
          </a>
        </nav>
      </details>

      <a
        href=""
        className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
      >
        Billing
      </a>

      <a
        href=""
        className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
      >
        Invoices
      </a>

      <details className="group">
        <summary className="flex items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
          <span className="text-sm font-medium"> Account </span>

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

        <nav className="flex flex-col mt-2 ml-8 space-y-1">
          <a
            href=""
            className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Details
          </a>

          <a
            href=""
            className="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          >
            Security
          </a>

          <form action="/logout">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Logout
            </button>
          </form>
        </nav>
      </details>
    </nav>
  );
}
