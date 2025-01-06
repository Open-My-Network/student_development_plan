import "./style.css";

export const MyButton = ({ children, onClick, ...rest }) => {
  return (
    <button className="cta-button" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
