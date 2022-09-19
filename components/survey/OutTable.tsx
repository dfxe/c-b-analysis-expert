import { useDetails } from "../contexts/DetailsProvider";

export default function OutTable() {
  const details = useDetails();
  const getCurrencySymbol = (currency: string) => {
    if (currency === "USD") {
      return "$";
    } else if (currency === "EUR") {
      return "€";
    } else if (currency === "GBP") {
      return "£";
    }
    return currency;
  };
  return (
    <div className="overflow-hidden overflow-x-auto border border-gray-100 rounded">
      <div className="text-xl px-4 py-2">
        {details.state.title +
          `${
            details.state.initiative === ""
              ? ""
              : " - " + details.state.initiative
          }`}
      </div>
      <table className="min-w-full text-sm divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
              Quantitative Costs
            </th>
            <th className="px-4 py-2 font-medium text-left text-gray-900 whitespace-nowrap">
              {/** TODO does not pick up periodUnit */}
              {details.state.periodUnit === ""
                ? ""
                : "Cost per " + details.state.periodUnit}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="px-4 py-2 font-medium text-left text-gray-500 bg-gray-200 whitespace-nowrap">
            <th className="px-4 py-2">Non-recurring</th>
          </tr>
        </tbody>
        {details.state.costs.map((item, i) => {
          if (!item.isRecurring) {
            return (
              <tbody
                key={
                  item.title +
                  item.title.length.toString() +
                  i.toString() +
                  "table"
                }
                className="divide-y divide-gray-100"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 font-medium text-left text-gray-900 bg-gray-200 whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-gray-400" : "text-gray-900"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {getCurrencySymbol(details.state.currency) +
                      " " +
                      item.periodCost.toString()}
                  </td>
                </tr>
              </tbody>
            );
          }
        })}
        <tbody>
          <tr className="px-4 py-2 font-medium text-left text-gray-500 bg-gray-200 whitespace-nowrap">
            <th className="px-4 py-2">Recurring</th>
          </tr>
        </tbody>
        {details.state.costs.map((item, i) => {
          if (item.isRecurring) {
            return (
              <tbody
                key={
                  item.title +
                  item.title.length.toString() +
                  i.toString() +
                  "table"
                }
                className="divide-y divide-gray-100"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 font-medium text-left text-gray-900 bg-gray-200 whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-gray-400" : "text-gray-900"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {getCurrencySymbol(details.state.currency) +
                      " " +
                      item.periodCost.toString()}
                  </td>
                </tr>
              </tbody>
            );
          }
        })}
        <tbody>
          <tr className="px-4 py-2 font-medium text-left text-gray-500 bg-gray-200 whitespace-nowrap">
            <th className="px-4 py-2">Benefits</th>
          </tr>
        </tbody>
        {details.state.benefits.map((item, i) => {
          if (item.isRecurring) {
            return (
              <tbody
                key={
                  item.title +
                  item.title.length.toString() +
                  i.toString() +
                  "table-benefits"
                }
                className="divide-y divide-gray-100"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 font-medium text-left text-gray-900 bg-gray-200 whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-gray-400" : "text-gray-900"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {getCurrencySymbol(details.state.currency) +
                      " " +
                      item.periodCost.toString()}
                  </td>
                </tr>
              </tbody>
            );
          }
        })}
      </table>
    </div>
  );
}
