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
  return (
    <div>
      <article className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-lg">
        <span className="p-3 bg-gray-100 rounded-full text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {getCurrencySymbol(currency) + " " + endValue.toString()}
          </p>

          <p className="text-sm text-gray-500">Cost</p>
        </div>
        <div>
          {+endValue >= 1
            ? "If your estimates are accurate (with margin of error) then you can go ahead with the project"
            : +endValue === 0
            ? ""
            : "Your estimates show you might not want to go ahead with this project"}
        </div>
      </article>
    </div>
  );
}
