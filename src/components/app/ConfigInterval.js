import React from "react";
import { number, func } from "prop-types";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const refFreqs = [
  [10, "10 sec"],
  [30, "30 sec"],
  [60, "1 min"],
  [300, "5 min"],
  [600, "10 min"],
  [900, "15 min"],
  [1200, "20 min"],
  [1800, "30 min"],
  [3600, "60 min"]
];

const formStyle = {
  background: "#222230",
  border: "0px",
  padding: "0px"
};

ConfigInterval.propTypes = {
  interval: number.isRequired,
  onChange: func.isRequired
};

function ConfigInterval({ interval = 60, onChange }) {
  return (
    <div style={formStyle}>
      <FormGroup>
        <ControlLabel> Quotes update interval: </ControlLabel>
        <FormControl
          componentClass="select"
          name="interval"
          bsSize="small"
          value={interval}
          onChange={evt => onChange(parseInt(evt.target.value, 10))}
        >
          {refFreqs.map(freq =>
            <option key={freq[0]} value={freq[0]}>{freq[1]} </option>
          )}
        </FormControl>
      </FormGroup>
    </div>
  );
}

export default ConfigInterval;
