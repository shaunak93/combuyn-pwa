import React from "react";

function Section(props) {
  const { id, classes, children } = props;
  return (
    <div id={id} className={`section ${classes ? classes.join(" ") : ""}`}>
      {children}
    </div>
  );
}

export default Section;
