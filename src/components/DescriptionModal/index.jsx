import { SideSheet } from "evergreen-ui";
import styles from "./description.module.scss";
import moment from "moment";

const DescriptionModal = ({ showModal, setShowModal, selected }) => {
  return (
    <SideSheet isShown={showModal} onCloseComplete={() => setShowModal(false)}>
      <div className={styles.description}>
        <h5>Recipient name</h5>
        <p>{selected.name}</p>
        <h5>Recipient bank</h5>
        <p>{selected.recipient?.details?.bank_name}</p>
        <h5>Recipient account number</h5>
        <p>{selected.recipient?.details?.account_number}</p>

        <h5>Recipient code</h5>
        <p>{selected.recipient?.recipient_code}</p>
        <h5>Date Created</h5>
        <p>
          {moment(selected.recipient?.createdAt).format("MMM DD, yyyy")}
          &nbsp; &nbsp;
          {new Date(selected.recipient?.createdAt).toLocaleTimeString()}
        </p>
      </div>
    </SideSheet>
  );
};

export default DescriptionModal;
