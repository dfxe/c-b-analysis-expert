import { useState } from "react";
import { useDetails } from "../../contexts/DetailsContext";

type Props = {
  categoryFrequency: string;
};
export default function AddCategory({ categoryFrequency }: Props) {
  const details = useDetails();
  const [field, setField] = useState<string>("");
  const handleAdd = () => {
    if (field === "") return;
    const isDuplicate = (): boolean => {
      if (categoryFrequency === "general") {
        return details.state.benefits.some((item) => item.category === field);
      } else if (
        categoryFrequency === "recurring" ||
        categoryFrequency === "non-recurring"
      ) {
        return details.state.costs.some((item) => item.category === field);
      } else {
        throw new Error("Check duplicate under unknown category frequency.");
      }
    };

    if (!isDuplicate()) {
      if (categoryFrequency === "recurring") {
        details.dispatch({
          type: "add_recurring_cost_category",
          nextAction: field,
        });
      } else if (categoryFrequency === "non-recurring") {
        details.dispatch({
          type: "add_non_recurring_cost_category",
          nextAction: field,
        });
      } else if (categoryFrequency === "general") {
        details.dispatch({
          type: "add_benefit",
          nextAction: field,
        });
      } else {
        throw new Error("Category frequency not found");
      }
      setField("");
    } else {
      throw new Error("Duplicate");
    }
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField((e.target as HTMLInputElement).value);
  };

  return (
    <div className="print:hidden">
      <div className="relative">
        <input
          className="w-full py-4 pl-3 pr-20 text-sm riso-input"
          type="text"
          placeholder="+ add category (i.e. Hardware, Software)"
          value={field}
          onChange={handleInput}
        />

        <button
          className="absolute p-2 riso-btn rounded-none -translate-y-1/2 top-1/2 right-3"
          type="button"
          onClick={handleAdd}
          disabled={field === ""}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
