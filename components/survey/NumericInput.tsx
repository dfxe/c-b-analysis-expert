import React, { useState } from "react";

export default function NumericInput() {
  const [numericInput, setNumericInput] = useState(0);
  return (
    <input
      type="text"
      className="block border-2 px-4 py-2 w-1/2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
      pattern="[0-9]*"
      onChange={(e) => {
        !isNaN(+e.target.value) && setNumericInput(+e.target.value);
      }}
      value={numericInput}
    />
  );
}
