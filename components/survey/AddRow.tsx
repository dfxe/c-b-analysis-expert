import { useDetails } from "../contexts/DetailsProvider";
import { nanoid } from "nanoid";

export default function AddRow() {
  const details = useDetails();
  return (
    <div>
      <button
        onClick={() =>
          details.dispatch({
            type: "add_recurring_cost",
            nextRecurringCostObject: {
              id: nanoid(),
              title: "",
              description: "",
              question: "",
              category: "",
              period: { periodTimeUnit: "", periodTime: 0, periodCost: 0 },
            },
          })
        }
      >
        Add field
      </button>
    </div>
  );
}
