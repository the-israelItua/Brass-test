import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../makepayment.module.scss";
import Input from "components/Input";
import Button from "components/Button";
import { updateTransferDetails } from "store/actions";

const StepOne = ({ setStep }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleNext = () => {
    dispatch(updateTransferDetails({ key: "name", value: name }));
    setStep(2);
  };

  return (
    <div className={styles.payment__body__grp}>
      <Input
        label="Recipent Name"
        name="name"
        placeholder="Enter recipient's name"
        autoFocus
        labelStyle={{
          color: "black",
          fontSize: "0.9em",
        }}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.payment__body__grp__btn}>
        <Button text="Next" onClick={handleNext} disabled={!name.length} />
      </div>
    </div>
  );
};

export default StepOne;
