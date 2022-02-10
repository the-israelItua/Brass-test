import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createTransferRecipient,
  initiateTransfer,
  updateTransferDetails,
} from "store/actions";
import styles from "../makepayment.module.scss";
import Input from "components/Input";
import Button from "components/Button";

const StepThree = ({ setStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const transferDetails = useSelector(
    (state) => state.payments.transferDetails
  );
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = {
      type: "nuban",
      name: transferDetails.name,
      account_number: transferDetails.bankDetails?.accountNumber,
      bank_code: transferDetails.bankDetails?.bankCode,
      currency: "NGN",
    };

    dispatch(createTransferRecipient(params));
  }, [dispatch]);

  const handleNext = () => {
    setLoading(true);
    const params = JSON.stringify({
      source: "balance",
      amount,
      recipient: transferDetails.recipient?.recipient_code,
      reason: "Customer Payout",
    });

    dispatch(updateTransferDetails({ key: "amount", value: amount }));
    const onSuccess = () => {
      navigate("/");
      setLoading(false);
    };

    const onFail = () => {
      setLoading(false);
    };

    dispatch(initiateTransfer(params, onSuccess, onFail));
  };

  return (
    <div className={styles.payment__body__grp}>
      <Input
        label="Amount to Send"
        name="name"
        placeholder="Enter amount"
        subText="Minumum amount: ₦100.  Maximum amount: ₦10,000,000"
        autoFocus
        type="number"
        labelStyle={{
          color: "black",
          fontSize: "0.9em",
        }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className={styles.payment__body__grp__btn__grid}>
        <Button text="Back" onClick={() => setStep(2)} variant="orange" />
        <Button
          text={loading ? "Please wait..." : "Pay"}
          onClick={handleNext}
          disabled={amount < 100 || amount > 10000000}
        />
      </div>
    </div>
  );
};

export default StepThree;
