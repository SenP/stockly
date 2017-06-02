import React from "react";
import { Button } from "react-bootstrap";
import Watchlists from "../watchlists";
import { refFreqs } from "../../app/Config";

const sidebarStyle = {
  padding: "0px 0px",
  margin: "0px"
};

const Sidebar = props => (
  <div style={sidebarStyle}>
    <div style={{margin: "10px"}}>
      <Button bsStyle="success" block onClick={() => props.onSelect(null)}>
        Dashboard
      </Button>
    </div>
    <Watchlists onChangeSelection={props.onSelect} />
    {/*<div>
				<label> Price update interval: </label> &nbsp;
				<select name="timer" #timer [ngModel]="refInterval">
						<option *ngFor="let f of refFreqs" [value]="f[0]"> {{ f[1] }}</option>
					</select> &nbsp; 
				&emsp;
				<button class="btn btn-default btn-xs" [disabled]="refInterval == timer.value"
						(click)="onChangeTimer(timer.value)">
                      	Change
                	</button>
				<button class="btn btn-default btn-xs" [disabled]="refInterval == timer.value"
						(click)="timer.value = refInterval;">
                      	Cancel
                	</button>
			</div>
			<hr />*/}
  </div>
);

export default Sidebar;
