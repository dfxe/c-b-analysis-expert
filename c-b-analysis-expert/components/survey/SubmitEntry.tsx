import React from "react";
import Button from "@mui/material/Button";
import NextPlanRoundedIcon from "@mui/icons-material/NextPlanRounded";
import Box from "@mui/material/Box";
import { useProgressNumber } from "../contexts/ProgressProvider";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
interface SubmitEntryProps {
  maxQuestions: number;
}
export function SubmitsEntry({ maxQuestions = 16 }: SubmitEntryProps) {
  const progress = useProgressNumber();
  const progressRatioRef = React.useRef(100 / maxQuestions);
  const advanceProgress = () => {
    return progress.getter + progressRatioRef.current < 101;
  };
  return (
    <Box sx={{ mt: "2rem" }}>
      <Button
        onClick={() =>
          advanceProgress() &&
          progress.setter(progress.getter + progressRatioRef.current)
        }
        variant="contained"
        endIcon={<NextPlanRoundedIcon />}
      >
        Next
      </Button>
    </Box>
  );
}

export default function SubmitEntry({ maxQuestions = 16 }: SubmitEntryProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant="progress"
      steps={maxQuestions}
      position="static"
      activeStep={activeStep}
      sx={{
        position: "fixed",
        bottom: "4rem",
        width: "50%",
        maxWidth: "100vw",
        flexGrow: 1,
      }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
