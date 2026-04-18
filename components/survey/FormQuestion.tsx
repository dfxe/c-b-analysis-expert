import { useDetails } from "../../contexts/DetailsContext";

interface FormQuestionProps {
  type: string;
  question: string;
}
export default function FormQuestion({
  type = "changed_org_tile",
  question = "?",
}: FormQuestionProps) {
  const details = useDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    details.dispatch({ type: type, nextAction: e.target.value });
  };
  return (
    <label
      className="relative block w-full p-3 riso-panel"
      htmlFor="name"
    >
      <input
        className="w-full bg-transparent px-0 pt-3.5 pb-0 text-sm placeholder-transparent border-none focus:ring-0 peer font-mono"
        id="name"
        type="text"
        onChange={handleChange}
        placeholder={question}
      />

      <span className="absolute text-[0.62rem] font-sans font-semibold uppercase tracking-[0.22em] text-ink-pink transition-all left-3 peer-focus:top-3 peer-focus:translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-ink-slate peer-placeholder-shown:font-serif peer-placeholder-shown:italic peer-placeholder-shown:font-normal">
        {question}
      </span>
    </label>
  );
}
