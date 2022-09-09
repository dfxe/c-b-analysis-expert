import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import InputAddAccordion from "./InputAddAccordion";
import EndCost from "./EndCost";
import OutTable from "./OutTable";

const Survey = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-24">Cost-Benefit Analysis</h1>
      <div className="w-full [&>*]:my-6">
        <div className="text-xl">Organisation Summary</div>
        <FormQuestion
          key={"5qNmRyQh-2vb0Wwa5oSr0"}
          question="What is the name of the organisation?"
        />
        <FormQuestion
          key={"1_YIjbAJMK58aYTEKHiD1"}
          question="What is the initiative of the organisation?"
        />
        <CurrencySelect />
        <hr></hr>
        <div className="text-xl">Quantitative Costs</div>
        <div className="text-lg">Non-recurring Costs</div>
        <InputAddAccordion></InputAddAccordion>
        <div className="text-lg">Recurring Costs</div>
        <hr></hr>
        <OutTable></OutTable>
        <EndCost></EndCost>
      </div>
    </div>
  );
};

export default Survey;
