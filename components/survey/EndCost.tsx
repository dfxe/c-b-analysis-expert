type Props = {
  currency: string;
  endValue: number;
};
export default function EndCost({ currency = "", endValue = 0 }: Props) {
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
  const verdict =
    +endValue >= 1
      ? "GO"
      : +endValue === 0
      ? "—"
      : "NO GO";
  const verdictBg =
    +endValue >= 1
      ? "bg-ink-teal"
      : +endValue === 0
      ? "bg-paper-dark"
      : "bg-ink-pink";
  const verdictColor =
    +endValue >= 1
      ? "text-ink-teal"
      : +endValue === 0
      ? "text-ink-slate"
      : "text-ink-pink";
  return (
    <div>
      <article className="relative flex items-center gap-6 p-6 riso-panel">
        <span
          className={`p-3 border border-ink-rule ${verdictBg} text-ink-black shrink-0`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div className="shrink-0 border-r border-ink-rule pr-6">
          <p className="ed-kicker !text-ink-black">B / C Ratio</p>
          <p className="text-4xl font-zine italic text-ink-black leading-none mt-2">
            {getCurrencySymbol(currency) + " " + endValue.toString()}
          </p>
        </div>
        <div className="ml-auto text-right">
          <div className="ed-kicker !text-ink-black">Verdict</div>
          <div
            className={`text-3xl font-zine italic ${verdictColor} leading-none mt-2`}
          >
            {verdict}
          </div>
          <div className="text-sm font-serif italic text-ink-slate max-w-xs mt-3 leading-snug">
            {+endValue >= 1
              ? "If your estimates hold within margin of error, the initiative warrants proceeding."
              : +endValue === 0
              ? ""
              : "Estimates suggest the initiative does not, at present, warrant proceeding."}
          </div>
        </div>
      </article>
    </div>
  );
}
