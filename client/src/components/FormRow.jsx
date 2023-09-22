import React from "react";

const FormRow = ({ name, value, onChange, label, type }) => {
  return (
    <div className="formRow">
      <label htmlFor={name}> {label}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        autoComplete="off"
        value={value}
      />
    </div>
  );
};

export default FormRow;
