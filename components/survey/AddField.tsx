import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDetails } from "../contexts/DetailsProvider";
import { nanoid } from "nanoid";

export default function BasicButtons() {
  const details = useDetails();
  return (
    <Stack spacing={2} direction="row">
      <Button
        variant="contained"
        onClick={() =>
          details.dispatch({
            type: "add_recurring_cost",
            nextRecurringCostObject: {
              id: nanoid(),
              title: "",
              description: "",
              question: "",
              category: "",
              period: { periodTimeUnit: "", periodTime: 0, periodCost: 0 },
            },
          })
        }
      >
        Add field
      </Button>
    </Stack>
  );
}
