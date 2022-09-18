import { ChangeEvent } from "react";
import { useDetails } from "../contexts/DetailsProvider";
import AddRow from "./AddRow";

type Props = {
  subCategoryName: string;
};
export default function InputField({ subCategoryName }: Props) {
  const details = useDetails();
  const handleDetails = (
    e: ChangeEvent<HTMLInputElement>,
    command: string,
    editId: string
  ) => {
    details.dispatch({
      type: command,
      nextAction: (e.target as HTMLInputElement).value,
      editId: editId,
    });
  };

  return (
    <nav className="flex flex-col space-y-1">
      <details className="group flex row">
        <summary className="flex border-2 items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() =>
              details.dispatch({
                type: "removed_category",
                nextAction: subCategoryName,
              })
            }
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
            {details.state.costs.length > 0 &&
              details.state.costs.map((item, i) => {
                if (item.category === subCategoryName) {
                  return (
                    <li
                      className="flex row justify-around items-center py-1"
                      key={item.id + i.toString() + "a"}
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
                            type: "removed_row",
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
                        className="block border-2 px-2 py-2 w-1/2 mr-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                        value={item.title}
                        onChange={(e) =>
                          handleDetails(
                            e,
                            "edit_input_at",
                            item.id + i.toString() + "a"
                          )
                        }
                      />
                      <input
                        placeholder="Cost"
                        type="text"
                        className="block border-2 px-4 py-2 w-1/2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                        onChange={(e) => {
                          !isNaN(+e.target.value) &&
                            handleDetails(
                              e,
                              "edit_period_cost",
                              item.id + i.toString() + "a"
                            );
                        }}
                        value={item.period.periodCost}
                      />
                    </li>
                  );
                }
              })}
          </ul>
        </nav>
        <div className="flex row justify-center items-center">
          <AddRow subCategoryName={subCategoryName}></AddRow>
        </div>
      </details>
    </nav>
  );
}
