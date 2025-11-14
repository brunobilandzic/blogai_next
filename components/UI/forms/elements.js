export const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
export const TextArea = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <textarea id={name} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export const Select = ({ label, name, value, onChange, options }) => {
  return (
    <div className="form-group">
      <label className="label" htmlFor={name}>
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={onChange}>
        <option key="zero" value="">
          Select an option
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

