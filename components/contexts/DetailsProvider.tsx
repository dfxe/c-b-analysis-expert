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
  recurringQuantitativeCost: { [key: string]: Row[] };
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
    id: nanoid(),
    title: "",
    initiative: "",
    currency: "",
    recurringQuantitativeCost: { Hardware: Row[] },
  },
  dispatch: (action: ActionType) => action,
});

export const useDetails = () => useContext(DetailsContext);

type Props = {
  children: React.ReactNode;
};

export default function DetailsProvider({ children }: Props) {
  const reducer = (state: Details, action: ActionType, editId: string) => {
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
            ...state.recurringQuantitativeCost.Hardware.map((item, i) => {
              if (item.id + i.toString() === action.editId) {
                console.log("foundasd");
                return {
                  ...item,
                  title: action.nextAction,
                };
              } else {
                return { ...item };
              }
            }),
          ],
        };
      case "edit_period_cost":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost.Hardware.map((item, i) => {
              if (item.id + i.toString() === action.editId) {
                return {
                  ...item,
                  period: {
                    ...item.period,
                    periodCost: action.nextAction,
                  },
                };
              } else {
                return { ...item };
              }
            }),
          ],
        };
      case "add_recurring_cost":
        return {
          ...state,
          recurringQuantitativeCost: [
            ...state.recurringQuantitativeCost.Hardware,
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
          recurringQuantitativeCost:
            state.recurringQuantitativeCost.Hardware.filter(
              (item, i) =>
                i != state.recurringQuantitativeCost.Hardware.length - 1
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
    recurringQuantitativeCost: [
      {
        id: "idEL0",
        title: "",
        category: "",
        period: {
          periodTimeUnit: "",
          periodTime: 0,
          periodCost: 0,
        },
      },
    ],
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
