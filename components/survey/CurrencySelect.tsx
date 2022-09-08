import React from "react";

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
      <input
        type={"range"}
        id="outlined-select-currency-native"
        value={details.state.currency.chosenCurrency}
        onChange={handleChange}
      />
      {/* {currencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))} */}
    </div>
  );
}
