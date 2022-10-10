import React from "react";
import "./style.css";

function Header() {
  return (
    <div className="container">
      <div>My Todo List</div>
      <div className="cont-right">
        <div>joyfive</div>
        <div onClick={() => window.open('https://github.com/joyfive', '_blank')} className="head-ico">JOY</div>
      </div>
    </div>
  );
}
export default Header;