import React, { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import { nanoid } from "nanoid";
import AddField from "./AddField";
import Footer from "./Footer";

const Survey = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-24">Cost-Benefit Analysis</h1>
      <div className="w-full [&>*]:my-6">
        <FormQuestion
          key={"C4i4MsLt8kp80bztULT6-"}
          question="What is the name of the organisation?"
        />
        <CurrencySelect key={"oUg-UxeEv20zib1QKiL3L"} />

        <AddField></AddField>
      </div>
    </div>
  );
};

export default Survey;
