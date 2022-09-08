import React, { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import { nanoid } from "nanoid";
import AddField from "./AddField";

const Survey = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <FormQuestion
        key={"C4i4MsLt8kp80bztULT6-"}
        question="What is the name of the organisation?"
      />
      <CurrencySelect key={"oUg-UxeEv20zib1QKiL3L"} />

      <AddField></AddField>
    </div>
  );
};

export default Survey;
