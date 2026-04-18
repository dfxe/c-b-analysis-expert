import { useDetails } from "../../contexts/DetailsContext";

type Props = {
  ratio: number;
};

const esc = (v: string | number) => {
  const s = String(v ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const download = (filename: string, mime: string, content: string) => {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function ExportButton({ ratio }: Props) {
  const details = useDetails();

  const slug = () =>
    (details.state.title || "analysis")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "analysis";

  const stamp = () => new Date().toISOString().slice(0, 10);

  const handleExportCsv = () => {
    const { title, initiative, currency, periodUnit, costs, benefits } =
      details.state;

    const totalNonRecurring = costs
      .filter((c) => !c.isRecurring && !c.isCategoryParent)
      .reduce((s, c) => s + Number(c.periodCost || 0), 0);
    const totalRecurring = costs
      .filter((c) => c.isRecurring && !c.isCategoryParent)
      .reduce((s, c) => s + Number(c.periodCost || 0), 0);
    const totalBenefits = benefits
      .filter((b) => !b.isCategoryParent)
      .reduce((s, b) => s + Number(b.periodCost || 0), 0);

    const rows: (string | number)[][] = [
      ["Cost-Benefit Analysis"],
      ["Organisation", title],
      ["Initiative", initiative],
      ["Currency", currency],
      ["Period", periodUnit],
      ["Exported", new Date().toISOString()],
      [],
      ["Section", "Category", "Item", "Amount"],
    ];

    const pushGroup = (
      label: string,
      items: typeof costs,
      predicate: (r: typeof costs[number]) => boolean
    ) => {
      items
        .filter(predicate)
        .filter((r) => !r.isCategoryParent)
        .forEach((r) =>
          rows.push([label, r.category, r.title || "(untitled)", r.periodCost])
        );
    };

    pushGroup("Non-recurring Cost", costs, (r) => !r.isRecurring);
    pushGroup("Recurring Cost", costs, (r) => r.isRecurring);
    pushGroup("Benefit", benefits, () => true);

    rows.push([]);
    rows.push(["Total Non-recurring Costs", "", "", totalNonRecurring]);
    rows.push(["Total Recurring Costs", "", "", totalRecurring]);
    rows.push(["Total Benefits", "", "", totalBenefits]);
    rows.push(["Benefit / Cost Ratio", "", "", ratio]);

    const csv = rows.map((r) => r.map(esc).join(",")).join("\n");
    download(`cba-${slug()}-${stamp()}.csv`, "text/csv", csv);
  };

  const handleExportJson = () => {
    const payload = {
      format: "cba/v1",
      exportedAt: new Date().toISOString(),
      ratio,
      state: details.state,
    };
    download(
      `cba-${slug()}-${stamp()}.json`,
      "application/json",
      JSON.stringify(payload, null, 2)
    );
  };

  return (
    <div className="flex justify-end gap-2">
      <button type="button" className="riso-btn" onClick={handleExportCsv}>
        ↓ Export CSV
      </button>
      <button type="button" className="riso-btn" onClick={handleExportJson}>
        ↓ Export JSON
      </button>
    </div>
  );
}
