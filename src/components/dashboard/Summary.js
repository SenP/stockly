import React from "react";
import { number } from "prop-types";
import { Panel, Row, Col } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import Colored from "../common/Colored";
import formatCash from "../../utils/formatCash";

const textStyle = {
  fontSize: "2rem",
  fontWeight: "400",
  textAlign: "center"
};

const valueStyle = {
  fontSize: "3rem",
  fontWeight: "600",
  textAlign: "center"
};

function ValueTile({ text = "", value = 0 }) {
  return (
    <Col md={4}>
      <div style={textStyle}>
        {text}
      </div>
      <div style={valueStyle}>
        <Colored
          value={formatCash(parseFloat(value, 10), { maximumFractionDigits: 0 })}
          prefix={<FontAwesome name="usd" />}
        />
      </div>
    </Col>
  );
}

Summary.propTypes = {
  portfolioValue: number,
  portfolioPnL: number,
  portfolioDaychange: number
};

export default function Summary({
  portfolioValue = 0,
  portfolioPnL = 0,
  portfolioDaychange = 0
}) {
  return (
    <Panel
      header={
        <Row>
          <ValueTile
            text="Portfolio Market Value"
            value={portfolioValue.toFixed(2)}
          />
          <ValueTile
            text=" Portfolio Net Profit/Loss"
            value={portfolioPnL.toFixed(2)}
          />
          <ValueTile
            text="Portfolio Day Change"
            value={portfolioDaychange.toFixed(2)}
          />
        </Row>
      }
    />
  );
}
