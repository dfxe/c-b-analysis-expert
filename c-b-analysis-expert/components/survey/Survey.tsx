import React, { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CurrencySelect from "./CurrencySelect";
import SubmitEntry from "./SubmitEntry";
import FormQuestion from "./FormQuestion";
import Typography from "@mui/material/Typography";
import OutTable from "./OutTable";
const Survey = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [data, setData] = useState({
    orgDetails: {
      id: 2,
      title: "",
      initiative: "",
      question: "What is the name of the org?",
    },
    currency: "GBP",
    quantitativeCosts: {
      recurring: {
        id: 1,
        title: "Servers",
        description: "Computers being used to deploy the product.",
        question: "How much is the overhead cost for the server?",
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
        Cost Benefit Analysis Survey
      </Typography>

      {currentPage === 0 && <CurrencySelect></CurrencySelect>}

      {currentPage === 1 && (
        <FormQuestion question="What is the name of the org?" />
      )}

      {currentPage === 2 && <OutTable></OutTable>}

      <SubmitEntry
        setCurrentPage={setCurrentPage}
        maxQuestions={maxQuestionsRef.current}
      ></SubmitEntry>
    </div>
  );
};

export default Survey;
