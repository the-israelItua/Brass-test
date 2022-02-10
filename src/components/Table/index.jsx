import styles from "./table.module.scss";

const Table = ({ children }) => {
  return (
    <div className={styles.tablecontainer}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

const TableHead = ({ children }) => {
  return <thead className={styles.tablehead}>{children}</thead>;
};

const TableBody = ({ children }) => {
  return <tbody className={styles.tablebody}>{children}</tbody>;
};

const Tr = ({ children, onClick, ...rest }) => {
  return (
    <tr className={styles.tr} onClick={onClick} {...rest}>
      {children}
    </tr>
  );
};

const Td = ({ children }) => {
  return <td className={styles.td}>{children}</td>;
};

const Th = ({ children }) => {
  return <th className={styles.th}>{children}</th>;
};

Table.Td = Td;
Table.Tr = Tr;
Table.Th = Th;
Table.Thead = TableHead;
Table.TBody = TableBody;

export default Table;
