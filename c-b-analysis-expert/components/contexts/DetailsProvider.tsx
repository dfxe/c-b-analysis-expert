import React, {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useReducer,
} from "react";
import { nanoid } from "nanoid";

interface CostRows {
  recurring: {
    id: string;
    title: string;
    description: string;
    category: string;
    period: {
      periodTimeUnit: string;
      periodTime: number;
      periodCost: number;
    };
  }[];
}

interface Details {
  orgDetails: {
    id: string;
    title: string;
    initiative: string;
    question: string;
  };
  currency: { chosenCurrency: string };
  quantitativeCosts: {
    recurring: {
      id: string;
      title: string;
      description: string;
      question: string;
      category: string;
      period: {
        periodTimeUnit: string;
        periodTime: number;
        periodCost: number;
      };
    }[];

    nonRecurring: {};
  };
  quantitativeBenefits: {
    recurring: {
      id: string;
      title: string;
      description: string;
      question: string;
      category: string;
      period: {
        periodTimeUnit: string;
        periodTime: number;
        periodCost: number;
      };
    }[];

    nonRecurring: {};
  };
}

interface ShowDetails {
  state: Details;
  dispatch: Dispatch<ActionType>;
}

interface ActionType {
  type: string;
  nextCurrency: string;
}

const DetailsContext = createContext({
  state: {
    orgDetails: {
      id: nanoid(),
      title: "",
      initiative: "",
      question: "What is the name of the org?",
    },
    currency: { chosenCurrency: "GBP" },
    quantitativeCosts: {
      recurring: [],
      nonRecurring: {},
    },
    quantitativeBenefits: {
      recurring: [
        {
          id: nanoid(),
          title: "Servers",
          description: "Computers being used to deploy the product.",
          question: "How much is the overhead cost for the server?",
          category: "Hardware",
          period: { periodTimeUnit: "w", periodTime: 1, periodCost: 10 },
        },
      ],
      nonRecurring: {},
    },
  },
  dispatch: () => {},
} as ShowDetails);

export const useDetails = () => useContext(DetailsContext);

type Props = {
  children: React.ReactNode;
};

export default function DetailsProvider({ children }: Props) {
  const reducer = (state: Details, action: ActionType) => {
    switch (action.type) {
      case "changed_currency":
        return {
          ...state,
          currency: { ...state.currency, chosenCurrency: action.nextCurrency },
        };
    }

    throw Error("Unknown action.");
  };

  const [state, dispatch] = useReducer(reducer, {
    orgDetails: {
      id: nanoid(),
      title: "",
      initiative: "",
      question: "What is the name of the org?",
    },
    currency: { chosenCurrency: "GBP" },
    quantitativeCosts: {
      recurring: [
        {
          id: nanoid(),
          title: "Servers",
          description: "Computers being used to deploy the product.",
          question: "How much is the overhead cost for the server?",
          category: "Hardware",
          period: { periodTimeUnit: "w", periodTime: 1, periodCost: 10 },
        },
      ],
      nonRecurring: {},
    },
    quantitativeBenefits: {
      recurring: [
        {
          id: nanoid(),
          title: "Servers",
          description: "Computers being used to deploy the product.",
          question: "How much is the overhead cost for the server?",
          category: "Hardware",
          period: { periodTimeUnit: "w", periodTime: 1, periodCost: 10 },
        },
      ],
      nonRecurring: {},
    },
  });

  React.useEffect(() => {
    console.log(state.currency);
  }, [state.currency]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
