import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { nanoid } from "nanoid";

type Row = {
  id: string;
  title: string;
  category: string;
  period: {
    periodTimeUnit: string;
    periodTime: number;
    periodCost: number;
  };
};

type Details = {
  id: string;
  title: string;
  initiative: string;
  currency: string;
  recurringQuantitativeCost: Array<Row>;
};

type ActionType = {
  type: string;
  //nextAction must map to each Details member
  //each details member should have the following nextAction
  //that is not good as
  nextAction?: string;
  editId?: string;
};
type ShowDetails = {
  state: Details;
  dispatch: Dispatch<ActionType>;
};

const DetailsContext = createContext<ShowDetails>({
  state: {
    id: nanoid(),
    title: "",
    initiative: "",
    currency: "",
    recurringQuantitativeCost: [],
  },
  dispatch: (action: ActionType) => action,
});

export const useDetails = () => useContext(DetailsContext);

type Props = {
  children: React.ReactNode;
};

export default function DetailsProvider({ children }: Props) {
  const reducer = (state: Details, action: ActionType, editId?: string) => {
    switch (action.type) {
      case "changed_currency":
        return {
          ...state,
          currency: action.nextAction,
        };
      case "changed_org_title":
        return {
          ...state,
          title: action.nextAction,
        };
      case "changed_org_initiative":
        return {
          ...state,
          initiative: action.nextAction,
        };
      case "edit_input_at":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              ...state.recurringQuantitativeCost.filter(
                (item) => item.id === editId
              ),
              title: action.nextAction,
            },
          ],
        };
      case "add_recurring_cost":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              id: nanoid(),
              title: "",
              category: "",
              period: {
                periodTimeUnit: "",
                periodTime: "",
                periodCost: "",
              },
            },
          ],
        };
      case "remove_last_recurring_cost":
        return {
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.filter(
            (item, i) => i != state.recurringQuantitativeCost.length - 1
          ),
        };
    }

    throw Error("Unknown action.");
  };

  const [state, dispatch] = useReducer(reducer, {
    id: "",
    title: "",
    initiative: "",
    currency: "$",
    recurringQuantitativeCost: [],
  });

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
