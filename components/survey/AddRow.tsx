import { useDetails } from "../contexts/DetailsProvider";
type Props = {
  subCategoryName: string;
};
export default function AddRow({ subCategoryName }: Props) {
  const details = useDetails();
  return (
    <button
      className="py-2 text-slate-500 font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100"
      onClick={() =>
        details.dispatch({
          type:
            subCategoryName === "recurring"
              ? "add_recurring_cost_row"
              : "add_non_recurring_cost_row",
          nextAction: subCategoryName, //category
        })
      }
    >
      Add field
    </button>
  );
}
