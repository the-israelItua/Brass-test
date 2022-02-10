import { useState } from "react";
import { SelectMenu } from "evergreen-ui";
import styles from "./select.module.scss";

const Select = ({ label, options, onChange }) => {
  const [selected, setSelected] = useState({ label: "", value: "" });

  const handleSelect = (item) => {
    setSelected(item);
    onChange(item.value);
  };

  return (
    <div className={styles.select}>
      <label>{label}</label>
      <SelectMenu
        title="Select name"
        options={options.map((option) => ({
          label: option.name,
          value: option.code,
        }))}
        selected={selected}
        onSelect={(item) => handleSelect(item)}
      >
        <input value={selected.label} />
      </SelectMenu>
    </div>
  );
};

export default Select;
