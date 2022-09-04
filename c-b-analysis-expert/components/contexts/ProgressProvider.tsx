import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

interface ShowNumber {
  getter: number;
  setter: Dispatch<SetStateAction<number>>;
}

const NumberContext = createContext({
  getter: 0,
  setter: () => {},
} as ShowNumber);

export const useProgressNumber = () => useContext(NumberContext);

type Props = {
  children: React.ReactNode;
};
export default function ProgressProvider({ children }: Props) {
  const [showNumbers, setShowNumbers] = useState<number>(0);

  return (
    <NumberContext.Provider
      value={{ getter: showNumbers, setter: setShowNumbers }}
    >
      {children}
    </NumberContext.Provider>
  );
}
