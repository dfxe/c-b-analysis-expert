import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { nanoid } from "nanoid";

interface Details {
  orgDetails: {
    id: string;
    title?: string;
    initiative?: string;
    question?: string;
  };
  currency: { chosenCurrency?: string };
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

  //@ts-ignore
  const [state, dispatch] = useReducer(reducer, {
    orgDetails: {
      id: nanoid(),
      title: "",
      initiative: "",
      question: "What is the name of the org?",
    },
    currency: { chosenCurrency: "USD" },
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
    console.log(state.quantitativeCosts.recurring);
  }, [state.quantitativeCosts.recurring]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
