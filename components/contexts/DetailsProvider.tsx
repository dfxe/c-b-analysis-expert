import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { nanoid } from "nanoid";

interface Row {
  id: string;
  title: string;
  category: string;
  period: {
    periodTimeUnit: string;
    periodTime: number;
    periodCost: number;
  };
}

interface Details {
  orgDetails: {
    id: string;
    title?: string;
    initiative?: string;
    question?: string;
  };
  currency: { chosenCurrency?: string };
  quantitativeCosts: {
    recurring: Row[];

    nonRecurring: Row[];
  };
  quantitativeBenefits: {
    nonRecurring: Row[];
  };
}

interface ActionType {
  type: string;
  nextCurrency?: string;
  nextOrgName?: string;
  nextInitiative?: string;
  nextQuestion?: string;
  nextRecurringCostObject?: {
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
  };
  qCostsTitle?: string;
  qCostsDescription?: string;
  qCostsQuestion?: string;
  qCostsCategory?: string;
  qCostsPeriod?: {
    periodTimeUnit?: string;
    periodTime?: number;
    periodCost?: number;
  };
}
interface ShowDetails {
  state: Details;
  dispatch: Dispatch<ActionType>;
}

const DetailsContext = createContext({
  state: {
    orgDetails: {
      id: nanoid(),
      title: "",
      initiative: "",
      question: "What is the name of the org?",
    },
    currency: { chosenCurrency: "USD" },
    quantitativeCosts: {
      recurring: [],
      nonRecurring: {},
    },
    quantitativeBenefits: {
      recurring: [],
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
      case "changed_org_name":
        return {
          ...state,
          orgDetails: {
            ...state.orgDetails,
            title: action.nextOrgName,
          },
        };
      case "changed_initiative":
        return {
          ...state,
          orgDetails: {
            ...state.orgDetails,
            initiative: action.nextInitiative,
          },
        };
      case "changed_question":
        return {
          ...state,
          orgDetails: {
            ...state.orgDetails,
            question: action.nextQuestion,
          },
        };
      case "add_recurring_cost":
        return {
          ...state,
          quantitativeCosts: {
            recurring: [
              ...state.quantitativeCosts.recurring,
              action.nextRecurringCostObject,
            ],
          },
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
    currency: { chosenCurrency: "USD" },
    quantitativeCosts: {
      recurring: [],
      nonRecurring: {},
    },
    quantitativeBenefits: {
      recurring: [],
      nonRecurring: {},
    },
  });

  React.useEffect(() => {
    console.log(state.quantitativeCosts.recurring);
  }, [state.quantitativeCosts.recurring]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
