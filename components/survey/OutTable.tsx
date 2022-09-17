import { useRef } from "react";
import { useDetails } from "../contexts/DetailsProvider";

export default function OutTable() {
  const details = useDetails();
  const rowRef = useRef("nullerino");

  const getNextRow = (currentRow: string) => {
    if (rowRef.current != currentRow) {
      rowRef.current = currentRow;
      return true;
    }
    return false;
  };
  return (
    <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
              Quantitative Costs
            </th>
            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
              Cost
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {/**TODO need a portal here to place at the correct category in the DOM */}
          {details.state.recurringQuantitativeCost.map((item, i) => {
            return (
              <tr
                key={
                  item.title +
                  item.title.length.toString() +
                  i.toString() +
                  "table"
                }
              >
                {getNextRow(item.category) && (
                  <th className="px-4 py-2 font-medium text-left text-gray-900 bg-gray-200 whitespace-nowrap">
                    {item.category}
                  </th>
                )}

                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {item.title}
                </td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                  {details.state.currency +
                    " " +
                    item.period.periodCost.toString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
