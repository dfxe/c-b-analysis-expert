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
      className="py-1.5 px-3 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.2em] text-ink-pink border border-ink-pink hover:bg-ink-pink hover:text-paper transition"
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
