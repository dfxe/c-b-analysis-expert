import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CurrencySelect from "./CurrencySelect";
import OverallProgress from "./OverallProgress";
import { useProgressNumber } from "../contexts/ProgressProvider";
import SubmitEntry from "./SubmitEntry";
import FormQuestion from "./FormQuestion";
import Typography from "@mui/material/Typography";
const Survey = () => {
  const [data, setData] = useState({
    orgDetails: {
      id: 2,
      title: "",
      initiative: "",
    },
    quantitativeCosts: {
      recurring: {
        id: 1,
        title: "Servers",
        description: "Computers being used to deploy the product.",
        category: "Hardware",
        period: { periodTimeUnit: "w", periodTime: 1, periodCost: 10 },
      },
      nonRecurring: {},
    },
    quantitativeBenefits: {
      recurring: {
        id: 1,
        title: "Servers",
        description: "Computers being used to deploy the product.",
        category: "Hardware",
        period: { periodTimeUnit: "w", periodTime: 1, periodCost: 10 },
      },
      nonRecurring: {},
    },
  });
  const maxQuestionsRef = React.useRef(7);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10rem",
      }}
    >
      <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
        Cost Benefit Analysis
      </Typography>

      <OverallProgress />

      <CurrencySelect></CurrencySelect>

      <FormQuestion question="What is the name of the org?" />

      <SubmitEntry maxQuestions={maxQuestionsRef.current}></SubmitEntry>
    </div>
  );
};

export default Survey;
