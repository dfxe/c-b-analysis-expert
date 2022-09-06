import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDetails } from "../contexts/DetailsProvider";
export default function CurrencySelect() {
  const details = useDetails();
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    details.dispatch({
      type: "changed_currency",
      nextCurrency: event.target.value,
    });
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
        <TextField
          id="outlined-select-currency-native"
          select
          label=""
          value={details.state.currency.chosenCurrency}
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
      </Box>
    </div>
  );
}
