import React from "react";
import { instanceOf, func } from "prop-types";
import { Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";

import { Stock as StockModel } from "../../../services";
import Colored from "../../common/Colored";
import formatCash from "../../../utils/formatCash";

StockView.propTypes = {
  stock: instanceOf(StockModel).isRequired,
  onEdit: func,
  onDelete: func
};

export default function StockView({ stock, onEdit, onDelete }) {
  return (
    <tr>
      <td>
        {stock.code}
      </td>
      <td className="number-field">
        {parseInt(stock.unitsOwned, 10)}
      </td>
      <td className="number-field">
        {parseFloat(stock.avgPrice).toFixed(2)}
      </td>
      <td className="number-field">
        {parseFloat(stock.lastPrice).toFixed(2)}
      </td>

      <td className="number-field">
        <Colored
          value={formatCash(parseFloat(stock.change, 10), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        />
      </td>

      <td className="number-field">
        <Colored
          value={formatCash(parseFloat(stock.percentChange, 10), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        />
      </td>

      <td className="number-field">
        {parseFloat(stock.marketValue).toFixed(2)}
      </td>

      <td className="number-field">
        <Colored
          value={formatCash(parseFloat(stock.dayChange, 10), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        />
      </td>

      <td className="number-field">
        <Colored
          value={formatCash(parseFloat(stock.netPnL, 10), {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        />
      </td>

      <td>
        <span className="center-block">
          <Button
            bsSize="xsmall"
            bsStyle="warning"
            onClick={onEdit}
            style={{ marginRight: "10px" }}
          >
            <FontAwesome name="pencil-square-o" />
          </Button>
          <Button
            bsSize="xsmall"
            bsStyle="danger"
            onClick={() => onDelete(stock)}
          >
            <FontAwesome name="trash-o" />
          </Button>
        </span>
      </td>
    </tr>
  );
}
