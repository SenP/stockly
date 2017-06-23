import React from "react";

function Sidebar({ children }) {
  return (
    <div style={sidebarStyle}>
      {children}
    </div>
  );
}

const sidebarStyle = {
  padding: "0px 0px",
  margin: "0px"
};

export default Sidebar;
