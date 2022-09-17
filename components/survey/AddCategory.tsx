import { useRef, useState } from "react";
import { useDetails } from "../contexts/DetailsProvider";

type Props = {
  categoryName: string;
};
export default function AddCategory({ categoryName }: Props) {
  const details = useDetails();
  const [isEmpty, setIsEmpty] = useState(true);
  const inputRef = useRef("");
  const handleAdd = () => {
    if (inputRef.current === "") return;
    const isDuplicate = () => {
      return details.state.recurringQuantitativeCost.some(
        (item) =>
          item.id ===
          inputRef.current +
            (details.state.recurringQuantitativeCost.length - 1).toString()
      );
    };

    if (!isDuplicate()) {
      if (categoryName === "recurring") {
        details.dispatch({
          type: "add_recurring_cost_category",
          nextAction: inputRef.current,
        });
      } else if (categoryName === "non-recurring") {
        details.dispatch({
          type: "add_non_recurring_cost_category",
          nextAction: inputRef.current,
        });
      }
    } else {
      throw Error("Duplicate");
    }
  };
  const handleInput = (e) => {
    setIsEmpty(e.target.value === "");
    inputRef.current = e.target.value;
  };
  const handleKey = (e) => {
    e.preventDefault();
    if (e.code === "KeyEnter") {
      handleAdd();
    }
  };
  return (
    <div>
      <div className="relative">
        <input
          className="w-full py-4 pl-3 pr-16 text-sm border-2 border-gray-200 rounded-lg"
          type="text"
          placeholder="Add category... (i.e. Hardware, Software)"
          onChange={handleInput}
        />

        <button
          className="absolute p-2 text-white disabled:bg-slate-500 bg-slate-500 rounded-full -translate-y-1/2 top-1/2 right-4 disabled:opacity-25"
          type="button"
          onClick={handleAdd}
          disabled={isEmpty}
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
