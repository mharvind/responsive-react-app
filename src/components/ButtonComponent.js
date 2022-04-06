import "./ButtonComponent.css";

import Button from "@mui/material/Button";

const ButtonComponent = (props) => {
  return (
    <Button
      variant={props.variant ? props.variant : "outlined"}
      onClick={props.onClick}
      className="btn"
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
