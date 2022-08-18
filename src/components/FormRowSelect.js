import React from "react";

const FormRowSelect = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  list,
}) => {
  return (
    <div className="form-row">
      <h3>{labelText || name}</h3>
      <select name={name} value={value} onChange={handleChange}>
        {list.map((value, index) => {
          return (
            <option value={value} key={index}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
