import Button from "components/Button";
import { useNavigate } from "react-router-dom";
import { EmptyIcon } from "assets/svgs";
import styles from "./emptytable.module.scss";

const EmptyTable = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.empty}>
      <EmptyIcon />

      <h3>You have not made any recent payment</h3>

      <p>Payments are shown here as you complete them</p>
      <Button
        onClick={() => navigate("/make-payment")}
        text="Make new payment"
      />
    </div>
  );
};

export default EmptyTable;
