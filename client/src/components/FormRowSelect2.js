const FormRowSelect2 = ({ type, labelText, name, unitName, value, unit, handleChange, min, max, list, disabled }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        style={{width: "75%", marginRight: "0.5rem"}}
        disabled={disabled}
      />
      <select
        name={unitName}
        value={unit}
        onChange={handleChange}
        className='form-select'
        style={{width: "20%"}}
        disabled={disabled}
      >
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect2
