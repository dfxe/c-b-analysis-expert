import React from "react";
import { useDetails } from "../../contexts/DetailsContext";
type Props = {
  actionDispatchType: string;
  values: { value: string; label: string }[];
  title: string;
};
export default function Dropdown({ actionDispatchType, values, title }: Props) {
  const details = useDetails();
  const [hideDropdown, setHideDropdown] = React.useState(true);
  const [selected, showSelected] = React.useState("");

  const handleChange = (item: string) => {
    details.dispatch({
      type: actionDispatchType,
      nextAction: item,
    });
    showSelected(item);
    setHideDropdown(!hideDropdown);
  };

  return (
    <div>
      <div className="ed-kicker mb-2 !text-ink-black">{title}</div>
      <div
        onClick={() => setHideDropdown(!hideDropdown)}
        className="w-full inline-flex justify-between riso-panel cursor-pointer"
      >
        <div className="px-4 py-2 text-sm font-serif italic text-ink-black hover:bg-paper-dark flex-1">
          {selected || "—"}
        </div>

        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center justify-center h-full px-3 text-ink-pink border-l border-ink-rule hover:bg-ink-pink hover:text-paper"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            className="absolute right-0 z-10 w-56 mt-4 riso-panel origin-top-right"
            role="menu"
            onBlur={() => setHideDropdown(true)}
            hidden={hideDropdown}
          >
            <div className="py-2 flow-root">
              <div className="-my-2 divide-y divide-ink-rule">
                <ul className="p-2">
                  {values.map((item, i) => (
                    <li
                      onClick={() => handleChange(item.value)}
                      key={item.value + i + title}
                      className="block cursor-pointer px-4 py-2 text-sm font-serif italic text-ink-black hover:bg-ink-pink hover:text-paper"
                      role="menuitem"
                    >
                      {item.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
