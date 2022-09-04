import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function CurrencySelect() {
  const currencies = [
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
    {
      value: "GBP",
      label: "GBP",
    },
    {
      value: "RON",
      label: "RON",
    },
  ];

  const [currency, setCurrency] = React.useState("EUR");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            label=""
            value={currency}
            onChange={handleChange}
            SelectProps={{
              native: true,
            }}
            helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>
      </Box>
    </div>
  );
}
