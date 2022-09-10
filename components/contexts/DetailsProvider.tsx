import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { nanoid } from "nanoid";
//observation about nanoid -> it only trigger once

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
  nextAction?: string | Array<Row> | HTMLInputElement;
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
  const reducer = (state: Details, action: ActionType) => {
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
            ...state.recurringQuantitativeCost.map((item) => {
              if (
                item.id ===
                (action.nextAction as HTMLInputElement).getAttribute("key")
              ) {
                return {
                  ...item,
                  title: (action.nextAction as HTMLInputElement).value,
                };
              } else {
                return { item };
              }
            }),
          ],
        };
      case "edit_period_cost":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost.map((item) => {
              if (
                item.id ===
                (action.nextAction as HTMLInputElement).getAttribute("key")
              ) {
                return {
                  ...item,
                  title: (action.nextAction as HTMLInputElement).value,
                };
              } else {
                return { item };
              }
            }),
          ],
        };
      case "add_recurring_cost":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              id: "idEL" + state.recurringQuantitativeCost.length.toString(),
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
    id: nanoid(),
    title: "",
    initiative: "",
    currency: "$",
    recurringQuantitativeCost: [],
  });

  React.useEffect(() => {
    /* state.recurringQuantitativeCost.map((item: Row[]) =>
      console.table(item[0]?.title)
    ); */
    console.log(state);
  }, [state.recurringQuantitativeCost]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
