import { FormRow, FormRowSelect, FormRowSelect2, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

const ProductPurchase = () => {
  const {
    isLoading,
    isEditing,
    exchangeType,
    showAlert,
    displayAlert,
    
    name,
    brand,
    quantity,
    price,
    weight,
    unit,
    unitOptions,
    exchangeQuantity,

    handleChange,
    clearValues,
    clearFilters,
   
    createProduct,
    editProduct,
    editSales,
  } = useAppContext()

  

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !brand || !exchangeQuantity || !price) {
      displayAlert()
      return
    }
    editSales()
  }
  const handleProductInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{exchangeType}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={handleProductInput}
            disabled
          />
          {/* company */}
          <FormRow
            type='text'
            name='brand'
            value={brand}
            handleChange={handleProductInput}
            disabled
          />
          {/* location */}
          <FormRow
            type='number'
            min='0'
            max='99999999'
            name='price'
            value={price}
            handleChange={handleProductInput}
            disabled
          />
          {/* job status */}
          <FormRowSelect2
            type="number"
            min='0'
            max='1000000'
            name='weight'
            unitName="unit"
            value={`${weight}`}
            unit={unit}
            handleChange={handleProductInput}
            list={unitOptions}
            disabled
          />
          {/* job type */}
          <FormRow
            type="number"
            min='1'
            max={exchangeType === 'sales'? quantity: 99999}
            labelText={`${exchangeType} Quantity`}
            name='exchangeQuantity'
            value={exchangeQuantity}
            handleChange={handleProductInput}
          />
          {/* btn container */}
          <div className='btn-container' style={{marginBottom: "1rem"}}>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default ProductPurchase
