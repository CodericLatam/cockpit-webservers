import React from "react";
import { Icon, Label } from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";
import CheckCircleIcon from "@patternfly/react-icons/dist/esm/icons/check-circle-icon";
import InfoCircleIcon from "@patternfly/react-icons/dist/esm/icons/info-circle-icon";
import BellIcon from "@patternfly/react-icons/dist/esm/icons/bell-icon";

export const IconStatus = ({ state }) => {
  switch (state) {
    case "stopped":
      return (
        <React.Fragment>
          <Label isCompact color="red" icon={<ExclamationTriangleIcon />}>Stopped</Label>
        </React.Fragment>
      );
    case "running":
      return (
        <React.Fragment>
            <Label isCompact color="green" icon={<CheckCircleIcon />}>Running</Label>
        </React.Fragment>
      );
      default:
      return (
        <React.Fragment>
            <Label isCompact color="grey" icon={<InfoCircleIcon />}>Not installed</Label>
        </React.Fragment>
      );
  }
};
