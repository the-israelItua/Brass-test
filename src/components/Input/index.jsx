import { forwardRef } from "react";
import styles from "./input.module.scss";

const Input = forwardRef((props, ref) => {
  return (
    <div className={styles.input}>
      <label style={props.labelStyle}>
        {props.label}
        <span>{props.subText}</span>
      </label>
      <input {...props} />
      <p>{props.error}</p>
    </div>
  );
});

export default Input;
