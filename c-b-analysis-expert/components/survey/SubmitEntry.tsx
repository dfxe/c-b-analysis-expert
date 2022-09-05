import React, { Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
interface SubmitEntryProps {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  summaries: string[];
  maxQuestions: number;
}

export default function SubmitEntry({
  setCurrentPage,
  summaries,
  maxQuestions = 16,
}: SubmitEntryProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const stepsContainerRef = React.useRef(null);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return summaries.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const scrollToItem = (nextStep: number) => {
    //TODO works in full screen mode perfectly,
    //ELSE: need to take into account box margins.w + container.w
    if (nextStep === 0) {
      stepsContainerRef.current.scrollTo(0, 0);
    } else {
      stepsContainerRef.current.scrollTo({
        left:
          stepsContainerRef.current.children[nextStep].getBoundingClientRect()
            .right / 2,
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          summaries.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  React.useEffect(() => {
    scrollToItem(activeStep);
    setCurrentPage(activeStep);
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%", mb: "10vh", mt: "10vh" }}>
      <Stepper
        ref={stepsContainerRef}
        nonLinear
        activeStep={activeStep}
        sx={{ overflowX: "scroll", overflowY: "hidden" }}
      >
        {summaries.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              color={completed[index] ? `success` : `inherit`}
              onClick={handleStep(index)}
            >
              {label}&ensp;&ensp;
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {activeStep !== summaries.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button variant="contained" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
              </Box>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
