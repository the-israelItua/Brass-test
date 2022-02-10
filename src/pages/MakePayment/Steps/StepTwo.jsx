import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyBankAccount, updateTransferDetails } from "store/actions";
import SelectMenu from "components/Select";
import Button from "components/Button";
import Input from "components/Input";
import styles from "../makepayment.module.scss";

const StepTwo = ({ setStep }) => {
  const dispatch = useDispatch();

  const [verified, setVerified] = useState({
    loading: false,
    correct: false,
  });

  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    bankCode: "",
  });

  const banks = useSelector((state) => state.payments.banks);

  const handleInputChange = (e) => {
    setBankDetails({ ...bankDetails, accountNumber: e.target.value });
    setVerified({ ...verified, correct: false });
  };

  const handleBlur = async () => {
    try {
      setVerified({
        ...verified,
        loading: true,
      });
      const correctAccount = await verifyBankAccount(bankDetails);
      setVerified({
        loading: false,
        correct: correctAccount,
      });
    } catch (e) {
      setVerified({
        loading: false,
        correct: false,
      });
    }
  };

  const handleNext = () => {
    dispatch(updateTransferDetails({ key: "bankDetails", value: bankDetails }));
    setStep(3);
  };

  return (
    <div className={styles.payment__body__grp}>
      <div className={styles.payment__body__grp__select}>
        <SelectMenu
          label="Select Recipient Bank"
          options={banks}
          onChange={(val) => setBankDetails({ ...bankDetails, bankCode: val })}
        />
      </div>

      <Input
        label="Recipent Account Number"
        name="recipient_account_number"
        placeholder="Enter recipient's account number"
        subText="Click outside the input field to verify account"
        labelStyle={{
          color: "black",
          fontSize: "0.9em",
        }}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      {verified.loading && <p>Verifying Account...</p>}

      <div className={styles.payment__body__grp__btn__grid}>
        <Button text="Back" onClick={() => setStep(1)} variant="orange" />
        <Button text="Next" onClick={handleNext} disabled={!verified.correct} />
      </div>
    </div>
  );
};

export default StepTwo;
