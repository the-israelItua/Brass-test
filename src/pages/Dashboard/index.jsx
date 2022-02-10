import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "components/Layout";
import Table from "components/Table";
import styles from "./dashboard.module.scss";
import Button from "components/Button";
import DescriptionModal from "components/DescriptionModal";
import { useNavigate } from "react-router-dom";
import EmptyTable from "components/EmptyTable";
import moment from "moment";

const DashBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState({});

  const navigate = useNavigate();

  const payments = useSelector((state) => state.payments.payments);

  const handleViewModal = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  return (
    <Layout>
      <section className={styles.dashboard}>
        <div className={styles.dashboard__header}>
          <h3>Payments</h3>
          <div className={styles.dashboard__header__btn}>
            <Button
              text="Make Payment"
              onClick={() => navigate("/make-payment")}
            />
          </div>
        </div>

        {!payments.length ? (
          <div className={styles.dashboard__empty}>
            <EmptyTable />
          </div>
        ) : (
          <div className={styles.dashboard__items}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Recipient Name</Table.Th>
                  <Table.Th>Recipient Account Number</Table.Th>
                  <Table.Th>Recipient Bank Name</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Date</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.TBody>
                {payments.map((item) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>{item.name}</Table.Td>
                    <Table.Td>
                      {item.recipient.details?.account_number}
                    </Table.Td>

                    <Table.Td>{item.recipient?.details?.bank_name}</Table.Td>
                    <Table.Td>
                      {moment(item.recipient?.createdAt).format("MMM DD, yyyy")}
                      &nbsp; &nbsp;
                      {new Date(item.recipient?.createdAt).toLocaleTimeString()}
                    </Table.Td>
                    <Table.Td>₦{item.amount}</Table.Td>
                    <Table.Td>
                      <button
                        className={styles.dashboard__items__link}
                        onClick={() => handleViewModal(item)}
                      >
                        View Details
                      </button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.TBody>
            </Table>
          </div>
        )}
        <DescriptionModal
          showModal={showModal}
          setShowModal={setShowModal}
          selected={selected}
        />
      </section>
    </Layout>
  );
};

export default DashBoard;
