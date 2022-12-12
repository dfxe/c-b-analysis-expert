import { useDetails } from "../../contexts/DetailsContext";
type Props = {
  categoryFrequency: string;
  subCategoryName: string;
  children: React.ReactNode;
};
export default function AddRow({
  categoryFrequency,
  subCategoryName,
  children,
}: Props) {
  const details = useDetails();
  return (
    <button
      className="py-2 text-slate-500 font-medium before:absolute before:-bottom-1 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-100"
      onClick={() => {
        if (categoryFrequency === "general") {
          details.dispatch({
            type: "add_benefit_row",
            nextAction: subCategoryName, //category
          });
        } else if (
          categoryFrequency === "recurring" ||
          categoryFrequency === "non-recurring"
        ) {
          details.dispatch({
            type: "add_cost_row",
            nextAction: subCategoryName, //category
          });
        } else {
          throw new Error("Add under unknown category frequency.");
        }
      }}
    >
      {children}
    </button>
  );
}
