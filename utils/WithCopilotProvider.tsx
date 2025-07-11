import React from "react";
import { CopilotProvider } from "react-native-copilot";
import Tooltip from "../components/CustomTooltip";
import EmptyStepNumber from "../components/EmptyStepNumber";

export function withCopilotProvider<P>(WrappedComponent: any): React.FC<P> {
  return function WithCopilot(props: P) {
    return (
      <CopilotProvider
        tooltipComponent={Tooltip}
        arrowColor="transparent"
        stepNumberComponent={EmptyStepNumber}
        overlay="view"
        tooltipStyle={{ backgroundColor: "transparent" }}
        backdropColor="rgba(23, 23, 23, 0.85)"
      >
        <WrappedComponent {...props} />
      </CopilotProvider>
    );
  };
}
