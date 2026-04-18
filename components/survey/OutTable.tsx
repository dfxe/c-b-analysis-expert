import { useDetails } from "../../contexts/DetailsContext";

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
    <div className="overflow-hidden overflow-x-auto riso-panel">
      <div className="px-5 py-4 bg-paper-light border-b border-ink-rule">
        <div className="ed-kicker mb-1">Summary</div>
        <div className="font-zine italic text-2xl text-ink-black leading-tight">
          {details.state.title +
            `${
              details.state.initiative === ""
                ? ""
                : " — " + details.state.initiative
            }`}
        </div>
      </div>
      <table className="min-w-full text-sm divide-y divide-ink-rule">
        <thead>
          <tr className="bg-ink-blue text-paper">
            <th className="px-4 py-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-left whitespace-nowrap">
              Quantitative Costs
            </th>
            <th className="px-4 py-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-left whitespace-nowrap">
              {/** TODO does not pick up periodUnit */}
              {details.state.periodUnit === ""
                ? ""
                : "Cost per " + details.state.periodUnit}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="px-4 py-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-left text-ink-pink bg-paper-deep border-y border-ink-pink/40 whitespace-nowrap">
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
                className="divide-y divide-ink-black/30"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-widest text-left text-ink-black bg-paper-dark whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-ink-black/40 italic" : "text-ink-black"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 font-mono text-ink-blue whitespace-nowrap">
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
          <tr className="px-4 py-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-left text-ink-pink bg-paper-deep border-y border-ink-pink/40 whitespace-nowrap">
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
                className="divide-y divide-ink-black/30"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-widest text-left text-ink-black bg-paper-dark whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-ink-black/40 italic" : "text-ink-black"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 font-mono text-ink-blue whitespace-nowrap">
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
          <tr className="px-4 py-2 text-[0.68rem] font-sans font-semibold uppercase tracking-[0.22em] text-left text-ink-pink bg-paper-deep border-y border-ink-pink/40 whitespace-nowrap">
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
                className="divide-y divide-ink-black/30"
              >
                {item.isCategoryParent && (
                  <tr className="px-4 py-2 text-xs font-sans font-semibold uppercase tracking-widest text-left text-ink-black bg-paper-dark whitespace-nowrap">
                    <th className="px-4 py-2">{item.category}</th>
                  </tr>
                )}
                <tr>
                  <td
                    className={`px-4 py-2 font-medium ${
                      item.title === "" ? "text-ink-black/40 italic" : "text-ink-black"
                    } whitespace-nowrap`}
                  >
                    {item.title || "empty"}
                  </td>
                  <td className="px-4 py-2 font-mono text-ink-blue whitespace-nowrap">
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
