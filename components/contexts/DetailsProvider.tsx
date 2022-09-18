import React, { createContext, Dispatch, useContext, useReducer } from "react";

type Row = {
  id: string;
  title: string;
  isRecurring: boolean;
  isCategoryParent: boolean;
  category: string;
  periodCost: number;
};

type Details = {
  id: string;
  title: string;
  initiative: string;
  currency: string;
  periodUnit: string;
  costs: Row[];
  benefits: Row[];
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
    periodUnit: "d",
    costs: [],
    benefits: [],
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
      case "changed_period_unit":
        return {
          ...state,
          periodUnit: action.nextAction,
        };
      case "edit_input_at":
        return {
          ...state,
          costs: state.costs.map((item) => {
            if (item.id === action.editId) {
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
          costs: state.costs.map((item) => {
            if (item.id === action.editId) {
              return {
                ...item,
                periodCost: action.nextAction,
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
              id:
                action.nextAction +
                state.costs.length.toString() +
                "a-non-recurring",
              title: "",
              isRecurring: false,
              isCategoryParent: true,
              category: action.nextAction,
              periodCost: 0,
            },
          ],
        };

      case "add_recurring_cost_category":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id:
                action.nextAction +
                state.costs.length.toString() +
                "a-recurring",
              title: "",
              isRecurring: true,
              isCategoryParent: true,
              category: action.nextAction,
              periodCost: 0,
            },
          ],
        };

      case "add_cost_row":
        return {
          ...state,
          costs: [
            ...state.costs,
            {
              id: action.nextAction + state.costs.length.toString() + "a-row",
              title: "",
              isRecurring: state.costs.filter(
                (item) =>
                  item.isCategoryParent && item.category === action.nextAction
              )[0].isRecurring,
              isCategoryParent: false,
              category: action.nextAction,
              periodCost: 0,
            },
          ],
        };

      case "removed_cost_category":
        return {
          ...state,
          costs: state.costs.filter(
            (item) => item.category != action.nextAction
          ),
        };
      case "removed_cost_row":
        //TODO - remove only the row that is being clicked
        return {
          ...state,
          costs: state.costs.filter((item) => {
            //console.log(item.id != action.nextAction);
            item.id != action.nextAction;
          }),
        };
      case "add_benefit":
        return {
          ...state,
          benefits: [
            ...state.benefits,
            {
              id:
                action.nextAction +
                state.benefits.length.toString() +
                "benefit",
              title: "",
              isRecurring: true,
              isCategoryParent: true,
              category: action.nextAction,
              periodCost: 0,
            },
          ],
        };
      case "add_benefit_row":
        return {
          ...state,
          benefits: [
            ...state.benefits,
            {
              id:
                action.nextAction + state.benefits.length.toString() + "b-row",
              title: "",
              isRecurring: state.benefits.filter(
                (item) =>
                  item.isCategoryParent && item.category === action.nextAction
              )[0].isRecurring,
              isCategoryParent: false,
              category: action.nextAction,
              periodCost: 0,
            },
          ],
        };
      case "removed_benefit_category":
        return {
          ...state,
          benefits: state.benefits.filter(
            (item) => item.category != action.nextAction
          ),
        };
      case "removed_benefit_row":
        //TODO - remove only the row that is being clicked
        return {
          ...state,
          benefits: state.benefits.filter((item) => {
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
    periodUnit: "",
    costs: [],
    benefits: [],
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
