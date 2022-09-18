import React, { createContext, Dispatch, useContext, useReducer } from "react";

type Row = {
  id: string;
  title: string;
  isRecurring: boolean;
  isCategoryParent: boolean;
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
  costs: Row[];
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

    costs: [],
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
          costs: state.costs.map((item, i) => {
            if (item.id + i.toString() + "a" === action.editId) {
              return {
                ...item,
                title: action.nextAction,
              };
            }
            return { ...item };
          }),
        };
      case "edit_period_cost":
        return {
          ...state,
          costs: state.costs.map((item, i) => {
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
          }),
        };

      case "add_non_recurring_cost_category":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id: action.nextAction + state.costs.length.toString() + "b",
              title: "i.e. Procurement",
              isRecurring: false,
              isCategoryParent: true,
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };

      case "add_non_recurring_cost_row":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id: action.nextAction + state.costs.length.toString() + "b",
              title: "",
              isRecurring: false,
              isCategoryParent: false,

              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };

      case "add_recurring_cost_category":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id: action.nextAction + state.costs.length.toString() + "a",
              title: "",
              isRecurring: true,
              isCategoryParent: true,
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };

      case "add_recurring_cost_row":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id: action.nextAction + state.costs.length.toString() + "a",
              title: "",
              isRecurring: true,
              isCategoryParent: false,
              category: action.nextAction,
              period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
            },
          ],
        };

      case "removed_category":
        return {
          ...state,
          costs: state.costs.filter(
            (item) => item.category != action.nextAction
          ),
        };
      case "removed_row":
        //TODO - remove only the row that is being clicked
        return {
          ...state,
          costs: state.costs.filter((item) => {
            //console.log(item.id != action.nextAction);
            item.id != action.nextAction;
          }),
        };
    }

    throw Error("Unknown action.");
  };

  const [state, dispatch] = useReducer(reducer, {
    id: "your-next-c-b-analysis-id",
    title: "",
    initiative: "",
    currency: "$",

    costs: [],
  });

  React.useEffect(() => {
    //console.log(state);
  }, [state.costs]);

  return (
    <DetailsContext.Provider value={{ state: state, dispatch: dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}
