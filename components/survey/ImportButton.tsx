import { useRef } from "react";
import { useDetails } from "../../contexts/DetailsContext";

type Row = {
  id: string;
  title: string;
  isRecurring: boolean;
  isCategoryParent: boolean;
  category: string;
  periodCost: number;
};

const parseCsvLine = (line: string): string[] => {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        q = false;
      } else {
        cur += c;
      }
    } else {
      if (c === '"') q = true;
      else if (c === ",") {
        out.push(cur);
        cur = "";
      } else cur += c;
    }
  }
  out.push(cur);
  return out;
};

const rid = (seed: string) =>
  `${seed}-${Math.random().toString(36).slice(2, 8)}`;

const withParents = (leaves: Omit<Row, "isCategoryParent">[]): Row[] => {
  const seen = new Map<string, Row>();
  const out: Row[] = [];
  leaves.forEach((leaf) => {
    if (!seen.has(leaf.category)) {
      const parent: Row = {
        id: rid(leaf.category + "-parent"),
        title: "",
        isRecurring: leaf.isRecurring,
        isCategoryParent: true,
        category: leaf.category,
        periodCost: 0,
      };
      seen.set(leaf.category, parent);
      out.push(parent);
    }
    out.push({ ...leaf, isCategoryParent: false });
  });
  return out;
};

const parseCsv = (text: string) => {
  const lines = text.split(/\r?\n/);
  const meta: Record<string, string> = {};
  let i = 0;
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") break;
    const cells = parseCsvLine(line);
    if (cells.length >= 2) meta[cells[0].trim().toLowerCase()] = cells[1];
  }
  while (i < lines.length && lines[i].trim() === "") i++;
  const header = i < lines.length ? parseCsvLine(lines[i++]) : [];
  if (
    header[0]?.toLowerCase() !== "section" ||
    header[1]?.toLowerCase() !== "category"
  ) {
    throw new Error("CSV header row not found (expected Section,Category,…).");
  }

  const costLeaves: Omit<Row, "isCategoryParent">[] = [];
  const benefitLeaves: Omit<Row, "isCategoryParent">[] = [];
  for (; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const cells = parseCsvLine(line);
    const section = (cells[0] || "").trim();
    if (/^total|^benefit ?\/ ?cost ratio/i.test(section)) break;
    const category = (cells[1] || "").trim();
    const title = (cells[2] || "").trim();
    const amount = Number(cells[3] || 0) || 0;
    if (!category) continue;
    const row = {
      id: rid(category),
      title: title === "(untitled)" ? "" : title,
      category,
      periodCost: amount,
      isRecurring: /^recurring/i.test(section) || /^benefit/i.test(section),
    };
    if (/^benefit/i.test(section)) benefitLeaves.push(row);
    else costLeaves.push(row);
  }

  return {
    title: meta["organisation"] || "",
    initiative: meta["initiative"] || "",
    currency: meta["currency"] || "$",
    periodUnit: meta["period"] || "",
    costs: withParents(costLeaves),
    benefits: withParents(benefitLeaves),
  };
};

const parseJson = (text: string) => {
  const raw = JSON.parse(text);
  const s = raw?.state ?? raw;
  if (!s || !Array.isArray(s.costs) || !Array.isArray(s.benefits)) {
    throw new Error("JSON does not contain a valid state shape.");
  }
  return {
    title: s.title ?? "",
    initiative: s.initiative ?? "",
    currency: s.currency ?? "$",
    periodUnit: s.periodUnit ?? "",
    costs: s.costs,
    benefits: s.benefits,
  };
};

export default function ImportButton() {
  const details = useDetails();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const text = await file.text();
    try {
      const isJson =
        file.name.toLowerCase().endsWith(".json") || text.trim().startsWith("{");
      const next = isJson ? parseJson(text) : parseCsv(text);
      details.dispatch({ type: "load_state", nextAction: next });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown parse error.";
      window.alert(`Import failed: ${msg}`);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.json,text/csv,application/json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        className="riso-btn"
        onClick={() => inputRef.current?.click()}
      >
        ↑ Import CSV / JSON
      </button>
    </>
  );
}
