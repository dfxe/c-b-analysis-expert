import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import InputField from "./InputField";
import EndCost from "./EndCost";
import AddCategory from "./AddCategory";
import { useDetails } from "../contexts/DetailsProvider";
import OutTable from "./OutTable";

const Survey = () => {
  const details = useDetails();

  const getInputField = (category: string) => {
    let categories: string[] = [];
    if (category === "recurring") {
      details.state.recurringQuantitativeCost.map((item) => {
        categories = [...categories, item.category];
      });
      categories = Array.from(new Set(categories).values());
      return categories.map((item) => (
        <InputField key={item + "cat-r"} subCategoryName={item} />
      ));
    } else if (category === "non-recurring") {
      details.state.nonRecurringQuantitativeCost.map((item) => {
        categories = [...categories, item.category];
      });
      categories = Array.from(new Set(categories).values());
      return categories.map((item) => (
        <InputField key={item + "cat-n-r"} subCategoryName={item} />
      ));
    }
    throw new Error(
      "Not a matching parent category. [recurring,non-recurring] are only valid ones"
    );
  };

  const computeCost = () => {
    let cost = 0;
    details.state.recurringQuantitativeCost.map(
      (item) => (cost += +item.period.periodCost)
    );
    return cost;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mt-24">Cost-Benefit Analysis</h1>
      <div className="w-full [&>*]:my-6">
        <div className="text-xl">Organisation Summary</div>
        <FormQuestion
          key={"5qNmRyQh-2vb0Wwa5oSr0"}
          type={"changed_org_title"}
          question="What is the name of the organisation?"
        />
        <FormQuestion
          key={"1_YIjbAJMK58aYTEKHiD1"}
          type={"changed_org_initiative"}
          question="What is the initiative of the organisation?"
        />
        <CurrencySelect />
        <hr></hr>
        <div className="text-xl">Quantitative Costs</div>
        <div className="text-lg">Non-recurring Costs</div>
        {details.state.nonRecurringQuantitativeCost.length > 0 &&
          getInputField("non-recurring")}
        <AddCategory
          key="add-cat-1-non-recurring"
          categoryName="non-recurring"
        />
        <div className="text-lg">Recurring Costs</div>

        {details.state.recurringQuantitativeCost.length > 0 &&
          getInputField("recurring")}
        <AddCategory key="add-cat-2-recurring" categoryName="recurring" />
        <hr></hr>
        <OutTable />
        <EndCost currency={details.state.currency} endValue={computeCost()} />
      </div>
    </div>
  );
};

export default Survey;
