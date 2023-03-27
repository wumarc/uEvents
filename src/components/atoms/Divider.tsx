import * as React from "react";
import { Divider } from "@rneui/base";

const EventDivider = () => {
  return (
    <Divider
      style={{ width: "100%", padding: 2, margin: 3}}
      color="grey"
      insetType="left"
      width={0.5}
      orientation="horizontal"
    />
  );
}

export default EventDivider;