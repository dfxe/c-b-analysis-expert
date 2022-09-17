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

type Category = {
  [key: string]: Row[];
};

type Details = {
  id: string;
  title: string;
  initiative: string;
  currency: string;
  recurringQuantitativeCost: Category[];
  nonRecurringQuantitativeCost: Category[];
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
    //TODO Type here needs to be any key and value of [key:value]
    recurringQuantitativeCost: [
      {
        hardware: [
          {
            id: "hdware",
            title: "Procurement",
            category: "hardware",
            period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
          },
        ],
      },
    ],
    nonRecurringQuantitativeCost: [],
  },
  dispatch: (action: ActionType) => action,
});

export const useDetails = () => useContext(DetailsContext);

type Props = {
  children: React.ReactNode;
};

export default function DetailsProvider({ children }: Props) {
  const reducer = (state: Details, action: ActionType, editId: string) => {
    console.log(
      state.recurringQuantitativeCost.map((item) =>
        Object.keys(item).map((key) => item[key])
      )
    );
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
            (item) =>
              Object.keys(item).map((key) =>
                item[key].map((v, i) => {
                  if (v.id + i.toString() === action.editId) {
                    return {
                      ...v,
                      title: action.nextAction,
                    };
                  }
                  return { ...item };
                })
              )
          ),
        };
      case "edit_period_cost":
        return {
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.map(
            (item) =>
              Object.keys(item).map((key) =>
                item[key].map((v, i) => {
                  if (v.id + i.toString() === action.editId) {
                    return {
                      ...v,
                      period: {
                        ...v.period,
                        periodCost: action.nextAction,
                      },
                    };
                  }
                  return { ...item };
                })
              )
          ),
        };

      case "add_recurring_cost_category":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              [action.nextAction as string]: [
                {
                  id:
                    action.nextAction +
                    state.recurringQuantitativeCost.length.toString(),
                  title: "i.e. Procurement",
                  category: action.nextAction,
                  period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
                },
              ],
            },
          ],
        };
      case "add_non_recurring_cost_category":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost,
            {
              [action.nextAction as string]: [
                {
                  id:
                    action.nextAction +
                    state.recurringQuantitativeCost.length.toString(),
                  title: "i.e. Procurement",
                  category: action.nextAction,
                  period: { periodTimeUnit: "d", periodTime: 1, periodCost: 1 },
                },
              ],
            },
          ],
        };
      case "add_recurring_cost_row": //under category (recurring or non-recurring)
        return {
          //TODO just the same as edit input, just with category instead of row
          ...state,
          recurringQuantitativeCost: state.recurringQuantitativeCost.map(
            (item) =>
              Object.keys(item).map((key) =>
                item[key].map((v, i) => {
                  if (v.id === action.nextAction + i.toString()) {
                    return [
                      ...item[key],
                      {
                        id:
                          action.nextAction +
                          (
                            state.recurringQuantitativeCost.length + 1
                          ).toString(),
                        title: "i.e. Procurement",
                        category: action.nextAction,
                        period: {
                          periodTimeUnit: "d",
                          periodTime: 1,
                          periodCost: 1,
                        },
                      },
                    ];
                  }
                  return { ...item };
                })
              )
          ),
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
