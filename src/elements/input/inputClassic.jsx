/* eslint-disable react/prop-types */


export const InputClassic = ({type="text", onchange, value, disabled, name, id, placeholder, required, classs, typeInputs="normal", min, max, checked, maxLength, minLength,autoComplete="off" }) => {

  const typeInput={
    normal:"inputClass",
    error:"inputError"
  }

  return (
    <input
      disabled={disabled}
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onchange}
      placeholder={placeholder}
      required={required}
      className={`${typeInput[typeInputs]} ${classs} border border-2`}
      min={min}
      max={max}
      checked={checked}
      maxLength={maxLength}
      minLength={minLength}
      autoComplete={autoComplete}
    />
  );
};
