import React from "react";
import { useDetails } from "../../contexts/DetailsContext";

export default function RemoveLastRow() {
  const details = useDetails();
  return (
    <button
      onClick={() => details.dispatch({ type: "remove_last_recurring_cost" })}
      className="relative text-slate-500 font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-right before:scale-x-0 before:bg-slate-500 before:transition hover:before:scale-100"
    >
      Remove Field
    </button>
  );
}
