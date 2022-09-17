import CurrencySelect from "./CurrencySelect";
import FormQuestion from "./FormQuestion";
import InputField from "./InputField";
import EndCost from "./EndCost";
import AddCategory from "./AddCategory";
import { useDetails } from "../contexts/DetailsProvider";

const Survey = () => {
  const details = useDetails();
  const getInputField = () => {
    let categories: string[] = [];
    //console.log(details.state.recurringQuantitativeCost);
    details.state.recurringQuantitativeCost.map((item) => {
      Object.keys(item).map((key) =>
        item[key].map((v) => {
          categories = [...categories, v.category];
        })
      );
    });
    categories = Array.from(new Set(categories).values());
    return categories.map((item) => (
      <InputField key={item + "cat"} subCategoryName={item} />
    ));
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
        <AddCategory
          key="add-cat-1-non-recurring"
          categoryName="non-recurring"
        />
        <div className="text-lg">Recurring Costs</div>
        <AddCategory key="add-cat-2-recurring" categoryName="recurring" />
        {details.state.recurringQuantitativeCost.length > 0 && getInputField()}
        <hr></hr>
        {/* <OutTable></OutTable> */}
        <EndCost></EndCost>
      </div>
    </div>
  );
};

export default Survey;
