import React from "react";
import { Button } from "react-bootstrap";

function dashboardButton({ onClick }) {
  return (
    <div style={{ margin: "10px" }}>
      <Button bsStyle="success" block onClick={() => onClick(null)}>
        Dashboard
      </Button>
    </div>
  );
}

export default dashboardButton;
