import React from "react";
import SubmitEntry from "./SubmitEntry";
import NumericInput from "./NumericInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useDetails } from "../contexts/DetailsProvider";

interface FormQuestionProps {
  question: string;
}
export default function FormQuestion({ question = "?" }: FormQuestionProps) {
  const details = useDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    details.dispatch({ type: "changed_org_name", nextOrgName: e.target.value });
  };
  return (
    <Box>
      <Typography variant="h6" component="h4" sx={{ textAlign: "center" }}>
        {question}
      </Typography>
      <TextField
        id="outlined-multiline-flexible"
        label="Multiline"
        multiline
        maxRows={4}
        value={details.state.orgDetails.title}
        onChange={handleChange}
      />
    </Box>
  );
}
