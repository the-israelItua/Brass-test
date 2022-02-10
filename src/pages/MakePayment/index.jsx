import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "components/Layout";
import styles from "./makepayment.module.scss";
import StepOne from "./Steps/StepOne";
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import { fetchBanks } from "store/actions";

const MakePayment = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const banks = useSelector((state) => state.payments.banks);

  useEffect(() => {
    if (!banks.length) {
      dispatch(fetchBanks());
    }
  }, [dispatch, banks.length]);

  return (
    <Layout>
      <section className={styles.payment}>
        <div className={styles.payment__body}>
          <h3>Make Payment</h3>
          {step === 1 ? (
            <StepOne setStep={setStep} />
          ) : step === 2 ? (
            <StepTwo setStep={setStep} />
          ) : (
            <StepThree setStep={setStep} />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default MakePayment;
