import Dropdown from "./Dropdown";
import FormQuestion from "./FormQuestion";
import InputField from "./InputField";
import EndCost from "./EndCost";
import AddCategory from "./AddCategory";
import { useDetails } from "../../contexts/DetailsContext";
import OutTable from "./OutTable";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

const Survey = () => {
  const details = useDetails();

  const getInputField = (categoryFrequency: string) => {
    let categories: string[] = [];
    if (categoryFrequency === "recurring") {
      details.state.costs.map((item) => {
        if (item.isRecurring) categories = [...categories, item.category];
      });
      categories = Array.from(new Set(categories).values());
      return categories.map((item) => (
        <InputField
          key={item + "cat-r"}
          categoryFrequency={categoryFrequency}
          subCategoryName={item}
        />
      ));
    } else if (categoryFrequency === "non-recurring") {
      details.state.costs.map((item) => {
        if (!item.isRecurring) categories = [...categories, item.category];
      });
      categories = Array.from(new Set(categories).values());
      return categories.map((item) => (
        <InputField
          key={item + "cat-n-r"}
          categoryFrequency={categoryFrequency}
          subCategoryName={item}
        />
      ));
    } else if (categoryFrequency === "general") {
      details.state.benefits.map((item) => {
        categories = [...categories, item.category];
      });
      categories = Array.from(new Set(categories).values());
      return categories.map((item) => (
        <InputField
          key={item + "cat-b"}
          categoryFrequency={categoryFrequency}
          subCategoryName={item}
        />
      ));
    }
    throw new Error(
      "Not a matching parent category. [recurring,non-recurring] are only valid ones"
    );
  };

  const computeCost = () => {
    //TODO analysis to cost needs be further researched
    let [cost, benefit] = [0, 0];
    details.state.costs.map((item) => (cost += +item.periodCost));
    details.state.benefits.map((item) => (benefit += +item.periodCost));
    return cost !== 0 ? parseInt((benefit / cost).toFixed(3), 10) : cost;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="riso-title mt-24 mb-4 text-5xl md:text-6xl text-center">
        Cost-Benefit Analysis
      </h1>
      <p className="mb-10 text-center italic text-ink-slate max-w-xl print:hidden">
        A worksheet for weighing recurring and one-off costs against projected
        benefits — with the verdict in a single ratio.
      </p>
      <hr className="ed-rule w-full max-w-xl mb-2 print:hidden" />
      <div className="w-full [&>*]:my-6 print:[&>*]:my-3">
        <div className="text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-ink-black border-b border-ink-rule pb-2 print:hidden">
          Organisation Summary
        </div>
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
        <Dropdown
          key={"1_YIjbAJMK58aYTEKHiD1asdasdwqe123"}
          actionDispatchType="changed_period_unit"
          values={[
            {
              value: "day",
              label: "d",
            },
            {
              value: "week",
              label: "w",
            },
            {
              value: "month",
              label: "m",
            },
            {
              value: "year",
              label: "yr",
            },
          ]}
          title="Pick a time unit"
        />

        <Dropdown
          key={"1_YIjbAJMK58aYnnmbvTEKHiD1asdasdwqe123"}
          actionDispatchType="changed_currency"
          values={[
            {
              value: "USD",
              label: "$",
            },
            {
              value: "EUR",
              label: "€",
            },
            {
              value: "GBP",
              label: "£",
            },
            {
              value: "RON",
              label: "RON",
            },
          ]}
          title="Pick your currency"
        />
        <hr className="print:hidden" />
        <div className="text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-ink-black border-b border-ink-rule pb-2 print:hidden">
          Quantitative Costs
        </div>
        <div className="ed-kicker print:hidden">Non-recurring Costs</div>
        {details.state.costs.length > 0 && getInputField("non-recurring")}
        <AddCategory
          key="add-cat-1-non-recurring"
          categoryFrequency="non-recurring"
        />
        <div className="ed-kicker print:hidden">Recurring Costs</div>

        {details.state.costs.length > 0 && getInputField("recurring")}
        <AddCategory key="add-cat-2-recurring" categoryFrequency="recurring" />

        <div className="text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-ink-blue border-b border-ink-blue/30 pb-2 print:hidden">
          Benefits
        </div>

        {details.state.benefits.length > 0 && getInputField("general")}
        <AddCategory key="add-cat-1-benefit" categoryFrequency="general" />
        <hr className="print:hidden" />
        <div className="flex justify-end print:hidden">
          <ImportButton />
        </div>
        <OutTable />
        <EndCost currency={details.state.currency} endValue={computeCost()} />
        <ExportButton ratio={computeCost()} />
      </div>
    </div>
  );
};

export default Survey;
