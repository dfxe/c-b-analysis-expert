import React from "react";
import { useDetails } from "../contexts/DetailsProvider";

export default function OutTable() {
  const details = useDetails();
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
          <tr>
            {details.state.recurringQuantitativeCost.length > 0 &&
              details.state.recurringQuantitativeCost.map((item) => {
                <>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {item.period.periodCost}
                  </td>
                </>;
              })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
