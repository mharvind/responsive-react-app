import React, { useState } from "react";

import "./SelectComponent.css";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectComponent = (props) => {
  return (
    <div className="select-container">
      <FormControl fullWidth style={props.style}>
        <InputLabel id="demo-simple-select-label">{props.id}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.id}
          onChange={props.onChange}
          autoWidth
          style={{ minWidth: "193px" }}
        >
          {props.values.map((item, index) => (
            <MenuItem
              fullWidth
              style={{ ...{ width: "193px" }, ...props.style }}
              value={item}
              key={index}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectComponent;
