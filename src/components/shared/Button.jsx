import { ReactPropTypes } from "react";
const Button = ({ children, version, type, isDisabled }) => {
  return (
    <div>
      <button
        type={type}
        className={`btn btn-${version}`}
        disabled={isDisabled}
      >
        {children}
      </button>
    </div>
  );
};

Button.defaultProps = {
  version: "primary",
  type: "button",
  isDisabled: false,
};

// Button.ReactPropTypes = { children: ReactPropTypes.node.isRequired,
//                           };

export default Button;
