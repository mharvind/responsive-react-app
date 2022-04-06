import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleComponent = (props) => {
  return (
    <ToggleButtonGroup
      value={props.selectedValue}
      exclusive
      onChange={props.handleChange}
      color="primary"
    >
      {props.data.map((item, index) => (
        <ToggleButton key={index} value={item.value}>
          {item.text}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleComponent;
