import styles from "./button.module.scss";
import cx from "classnames";

const Button = ({ text, type, onClick, disabled, variant }) => {
  return (
    <button
      className={
        variant === "orange"
          ? cx(styles.button, styles.button__orange)
          : styles.button
      }
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
