import React, { useState } from "react";
import TextField from "@mui/material/TextField";

export default function NumericInput() {
  const [checkIfNumber, setCheckIfNumber] = useState(false);

  return (
    <div>
      <TextField
        error={checkIfNumber}
        label={checkIfNumber ? `Error - Not a number` : `Input the amount`}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        onChange={(e) => {
          setCheckIfNumber(isNaN(+e.target.value));
        }}
      />
    </div>
  );
}
