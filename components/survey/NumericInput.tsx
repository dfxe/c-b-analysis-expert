import React, { useState } from "react";

type Props = {
  nextCallback: (
    e: React.ChangeEvent<HTMLInputElement>,
    command: string,
    elementId: string
  ) => void;
};

export default function NumericInput({ nextCallback }: Props) {
  const [numericInput, setNumericInput] = useState(0);
  const checkInput = (value: number): boolean => {
    return !isNaN(value);
  };
  const passValidInput = (value: string): number => {
    if (value.startsWith("0")) {
      const rest = value.split("").slice(1, -1);
      return +rest.join("");
    }
    return +value;
  };
  return (
    <input
      type="text"
      className="block border-2 px-4 py-2 w-1/2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
      pattern="[0-9]*"
      onChange={(e) => {
        checkInput(+e.target.value) &&
          setNumericInput(passValidInput(e.target.value));
      }}
      value={numericInput}
    />
  );
}
