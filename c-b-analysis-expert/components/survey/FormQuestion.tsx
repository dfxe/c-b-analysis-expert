import React from "react";
import SubmitEntry from "./SubmitEntry";
import NumericInput from "./NumericInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
interface FormQuestionProps {
  question: string;
}
export default function FormQuestion({ question = "?" }: FormQuestionProps) {
  return (
    <Box>
      <Typography variant="h6" component="h4" sx={{ textAlign: "center" }}>
        {question}
      </Typography>
      <NumericInput></NumericInput>
    </Box>
  );
}
