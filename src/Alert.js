import React, { useEffect } from "react";

const Alert = ({ msg, type, list, removeAlert }) => {
  useEffect(() => {
    console.log("useEffect");
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [list]);
  return (
    <React.Fragment>
      {console.log("render")}
      <p className={`alert alert-${type}`}>{msg}</p>
    </React.Fragment>
  );
};

export default Alert;
