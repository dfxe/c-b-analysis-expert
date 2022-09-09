import React, { useState } from "react";
import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import { nanoid } from "nanoid";
import AddField from "./AddField";
import Footer from "./Footer";
import InputAdd from "./InputAdd";
import InputAddAccordion from "./InputAddAccordion";
import EndCost from "./EndCost";

const Survey = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-24">Cost-Benefit Analysis</h1>
      <div className="w-full [&>*]:my-6">
        <div className="text-xl">Organisation Costs</div>
        <FormQuestion
          key={"5qNmRyQh-2vb0Wwa5oSr0"}
          question="What is the name of the organisation?"
        />
        <FormQuestion
          key={"1_YIjbAJMK58aYTEKHiD1"}
          question="What is the initiative of the organisation?"
        />
        <CurrencySelect />
        {/*<InputAdd></InputAdd>*/}
        <div className="text-xl">Quantitative Costs</div>
        <div className="text-lg">Non-recurring costs</div>
        <InputAddAccordion></InputAddAccordion>
        <div className="text-lg">Recurring costs</div>
        <EndCost></EndCost>
        {/* <AddField></AddField> */}
      </div>
    </div>
  );
};

export default Survey;
