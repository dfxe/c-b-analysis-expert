import React, { useState } from "react";

export default function NumericInput() {
  const [checkIfNumber, setCheckIfNumber] = useState(false);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setCheckIfNumber(isNaN(+e.target.value));
        }}
      />
    </div>
  );
}
