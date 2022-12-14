import { useDetails } from "../../contexts/DetailsContext";
import AddRow from "./AddRow";

type Props = {
  categoryFrequency: string;
  subCategoryName: string;
};
export default function InputField({
  categoryFrequency,
  subCategoryName,
}: Props) {
  const details = useDetails();

  const handleDetails = (value: string, command: string, elementId: string) => {
    details.dispatch({
      type: command,
      nextAction: value,
      editId: elementId,
    });
  };
  const checkInput = (value: number): boolean => {
    return !isNaN(value);
  };
  const passValidInput = (value: string): string => {
    if (
      value.startsWith("0") ||
      value.startsWith("+") ||
      value.startsWith("-")
    ) {
      const rest = value.split("").slice(1, -1);
      return rest.join("");
    }
    return value;
  };

  return (
    <nav className="flex flex-col space-y-1">
      <details className="flex group row">
        <summary className="flex items-center px-4 py-2 text-gray-500 border-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              if (categoryFrequency === "general") {
                details.dispatch({
                  type: "removed_benefit_category",
                  nextAction: subCategoryName,
                });
              } else if (
                categoryFrequency === "recurring" ||
                categoryFrequency === "non-recurring"
              ) {
                details.dispatch({
                  type: "removed_cost_category",
                  nextAction: subCategoryName,
                });
              } else {
                throw new Error(
                  "Cannot remove category due to invalid category frequency."
                );
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          &nbsp;&nbsp;
          <span className="text-sm font-medium">{subCategoryName}</span>
          <span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </summary>
        <nav className="flex flex-col mt-2">
          <ul>
            {categoryFrequency === "general"
              ? details.state.benefits.map((item) => {
                  if (item.category === subCategoryName) {
                    return (
                      <li
                        className="flex items-center justify-around py-1 row"
                        key={
                          item.id +
                          details.state.benefits.length.toString() +
                          "bli"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => {
                            details.dispatch({
                              type: "removed_benefit_row",
                              nextAction: item.id,
                            });
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        &nbsp;&nbsp;
                        <input
                          placeholder={"Row Title"}
                          type="text"
                          className="block w-1/2 px-2 py-2 mr-2 text-sm font-medium text-gray-500 border-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          value={item.title}
                          onChange={(e) =>
                            handleDetails(
                              e.target.value,
                              "edit_benefit_input_at",
                              item.id
                            )
                          }
                        />
                        {/**TODO 0 at start issue and when adding + or - */}
                        <input
                          placeholder="Cost"
                          type="text"
                          pattern={"[0-9]*"}
                          className="block w-1/2 px-4 py-2 text-sm font-medium text-gray-500 border-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          onChange={(e) => {
                            checkInput(+e.target.value) &&
                              handleDetails(
                                passValidInput(e.target.value),
                                "edit_benefit_period_cost",
                                item.id
                              );
                          }}
                          value={item.periodCost.toString()}
                        />
                      </li>
                    );
                  }
                })
              : details.state.costs.length > 0 &&
                details.state.costs.map((item) => {
                  if (item.category === subCategoryName) {
                    return (
                      <li
                        className="flex items-center justify-around py-1 row"
                        key={
                          item.id +
                          details.state.costs.length.toString() +
                          "cli"
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer"
                          onClick={() => {
                            details.dispatch({
                              type: "removed_cost_row",
                              nextAction: item.id,
                            });
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        &nbsp;&nbsp;
                        <input
                          placeholder={"Row Title"}
                          type="text"
                          className="block w-1/2 px-2 py-2 mr-2 text-sm font-medium text-gray-500 border-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          value={item.title}
                          onChange={(e) =>
                            handleDetails(
                              e.target.value,
                              "edit_input_at",
                              item.id
                            )
                          }
                        />
                        <input
                          placeholder="Cost"
                          type="text"
                          pattern={"[0-9]*"}
                          className="block w-1/2 px-4 py-2 text-sm font-medium text-gray-500 border-2 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          onChange={(e) => {
                            checkInput(+e.target.value) &&
                              handleDetails(
                                passValidInput(e.target.value),
                                "edit_period_cost",
                                item.id
                              );
                          }}
                          value={item.periodCost.toString()}
                        />
                      </li>
                    );
                  }
                })}
          </ul>
        </nav>
        <div className="flex items-center justify-end row">
          <AddRow
            categoryFrequency={categoryFrequency}
            subCategoryName={subCategoryName}
          >
            Add field
          </AddRow>
        </div>
      </details>
    </nav>
  );
}
