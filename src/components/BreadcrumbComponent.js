import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

const BreadcrumComponent = (props) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* <Link underline="hover" color="inherit" href="/">
        MUI
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/getting-started/installation/"
      >
        Core
      </Link>
      <Link
        underline="hover"
        color="text.primary"
        href="/components/breadcrumbs/"
        aria-current="page"
      >
        
        Breadcrumbs
      </Link> */}
      {props.data.map((item) => (
        <Link
          underline="hover"
          color="inherit"
          onClick={item.href}
          style={{ cursor: "pointer" }}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
export default BreadcrumComponent;
