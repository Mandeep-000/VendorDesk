const FormRow2 = ({ type, nameFrom, valueFrom, nameTo, valueTo, handleChange, labelText, min, max, disabled }) => {

  return (
    <div className='form-row'>
      <label htmlFor={nameFrom} className='form-label'>
        {labelText || nameFrom}
      </label>
      <input
        type={type}
        min={min}
        max={max}
        value={valueFrom}
        name={nameFrom}
        onChange={handleChange}
        className='form-input'
        style={{width: "46.5%", marginRight: "2%"}}
        disabled={disabled}
      />- 
      <input
        type={type}
        min={min}
        max={max}
        value={valueTo}
        name={nameTo}
        onChange={handleChange}
        className='form-input'
        style={{width: "46.5%", marginLeft: "2%"}}
        disabled={disabled}
      />
    </div>
  )
}

export default FormRow2
