export const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <input
      className="input-field"
      type={type}
      id={name}
      name={name}
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  );
};
export const TextArea = ({ label, name, value, onChange, rows }) => {
  return (
    <div className="form-group">
      <textarea
        className="textarea-field"
        id={name}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
        rows={rows || 4}
      />
    </div>
  );
};

export const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div>
      <select  className="form-select" id={name} name={name} value={value} onChange={onChange}>
        <option key="zero" disabled hidden value="">
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
