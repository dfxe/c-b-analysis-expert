import React, { createContext, Dispatch, useContext, useReducer } from "react";

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
  recurringQuantitativeCost: Row[];
  nonRecurringQuantitativeCost: Row[];
};

type ActionType = {
  type: string;
  //nextAction must map to each Details member
  //each details member should have the following nextAction
  //that is not good as
  nextAction?: string | Array<Row>;
  editId?: string;
};

type ShowDetails = {
  state: Details;
  dispatch: Dispatch<ActionType>;
};

const DetailsContext = createContext<ShowDetails>({
  state: {
    id: "your-next-c-b-analysis-id",
    title: "",
    initiative: "",
    currency: "",

    recurringQuantitativeCost: [],
    nonRecurringQuantitativeCost: [],
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
          recurringQuantitativeCost: state.recurringQuantitativeCost.map(
            (item, i) => {
              if (item.id + i.toString() + "a" === action.editId) {
                return {
                  ...item,
                  title: action.nextAction,
                };
              }
              return { ...item };
            }
          ),
        };
      case "edit_period_cost":
        return {
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.map(
            (item, i) => {
              if (item.id + i.toString() + "a" === action.editId) {
                return {
                  ...item,
                  period: {
                    ...item.period,
                    periodCost: action.nextAction,
                  },
                };
              }
              return { ...item };
            }
          ),
        };

      case "add_recurring_cost_category":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              id:
                action.nextAction +
                state.recurringQuantitativeCost.length.toString() +
                "a",
              title: "",
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };
      case "add_non_recurring_cost_category":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              id:
                action.nextAction +
                state.recurringQuantitativeCost.length.toString(),
              title: "i.e. Procurement",
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };
      case "add_recurring_cost_row": //under category (recurring or non-recurring)
        return {
          //TODO just the same as edit input, just with category instead of row
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              id:
                action.nextAction +
                state.recurringQuantitativeCost.length.toString() +
                "a",
              title: "",
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };
      case "removed_category":
        return {
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.filter(
            (item) => item.category != action.nextAction
          ),
        };
      case "removed_row":
        return {
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.filter(
            (item) => item.category != action.nextAction
          ),
        };
    }

    throw Error("Unknown action.");
  };

  const [state, dispatch] = useReducer(reducer, {
    id: "your-next-c-b-analysis-id",
    title: "",
    initiative: "",
    currency: "$",
    recurringQuantitativeCost: [],
    nonRecurringQuantitativeCost: [],
  });

  React.useEffect(() => {
    //console.log(state);
  }, [state.recurringQuantitativeCost]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
