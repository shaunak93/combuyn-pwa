import React from "react";

const Container = (props) => {
  const { children } = props;
  return (
    <div>
      {children &&
        children.length &&
        children.map((child, index) => {
          if (index === 0) return { child };
          return (
            <>
              <Divider />
              {Child}
            </>
          );
        })}
    </div>
  );
};
