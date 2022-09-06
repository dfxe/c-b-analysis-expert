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
  const maxQuestionsRef = React.useRef(7);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10vh",
      }}
    >
      <Typography variant="h4" component="h4" sx={{ textAlign: "center" }}>
        Cost-Benefit Analysis Survey
      </Typography>

      {currentPage === 0 && <CurrencySelect></CurrencySelect>}

      {currentPage === 1 && (
        <FormQuestion question="What is the name of the org?" />
      )}

      {currentPage === 2 && <OutTable></OutTable>}

      <SubmitEntry
        setCurrentPage={setCurrentPage}
        summaries={["Currency", " Organisation", "Tables", "More 1", "More 2"]}
        maxQuestions={maxQuestionsRef.current}
      ></SubmitEntry>
    </div>
  );
};

export default Survey;
