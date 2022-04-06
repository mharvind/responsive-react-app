import TextField from "@mui/material/TextField";

const TextFieldComponent = (props) => {
  return (
    <TextField
      label={props.label ? props.label : "outlined"}
      variant={props.variant ? props.variant : "outlined"}
      helperText={props.helperText}
      onChange={props.onChange}
      value={props.value}
      type={props.type ? props.type : "text"}
      size="medium"
    />
  );
};
export default TextFieldComponent;
