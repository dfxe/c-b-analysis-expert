import { ChangeEvent } from "react";
import { useDetails } from "../contexts/DetailsProvider";
import AddRow from "./AddRow";
import RemoveLastRow from "./RemoveLastRow";

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
      <details className="group">
        <summary className="flex border-2 items-center px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700">
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
            {details.state.recurringQuantitativeCost.length > 0 &&
              details.state.recurringQuantitativeCost.map((item) =>
                Object.keys(item).map((key) =>
                  item[key].map((value, i) => {
                    console.log("trigerrign");
                    return (
                      <li
                        className="flex row justify-around"
                        key={value.id + i.toString()}
                      >
                        <input
                          placeholder={"Row Title"}
                          key={"3"}
                          type="text"
                          className="block border-2 px-2 py-2 w-1/2 mr-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          value={value.title}
                          onChange={(e) =>
                            handleDetails(
                              e,
                              "edit_input_at",
                              value.id + i.toString()
                            )
                          }
                        />
                        <input
                          key={item.id + i.toString()}
                          placeholder={"Row Cost"}
                          type="text"
                          className="block border-2 px-4 py-2 w-1/2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                          onChange={(e) => {
                            !isNaN(+e.target.value) &&
                              handleDetails(
                                e,
                                "edit_period_cost",
                                value.id + i.toString()
                              );
                          }}
                          value={value.period.periodCost}
                        />
                      </li>
                    );
                  })
                )
              )}
          </ul>
        </nav>
        <div className="flex row justify-around mt-4">
          <AddRow subCategoryName={subCategoryName}></AddRow>
          <RemoveLastRow></RemoveLastRow>
        </div>
      </details>
    </nav>
  );
}
