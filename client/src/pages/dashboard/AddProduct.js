import { FormRow, FormRowSelect, FormRowSelect2, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

const AddProduct = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    
    name,
    brand,
    quantity,
    price,
    weight,
    unit,
    unitOptions,

    handleChange,
    clearValues,
    clearFilters,
   
    createProduct,
    editProduct,
  } = useAppContext()

  const location = useLocation();
  // const history = useHistory();

  // Call clearValues() when leaving the AddProduct page
  useEffect(() => {
    const unlisten = () => {
      if (location.pathname !== '/add-product') {
        clearValues();
      }
    };
    
    return () => {
      unlisten();
    };
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !brand || !quantity || !price) {
      displayAlert()
      return
    }

    if (isEditing) {
      editProduct()
      return
    }
    createProduct()
  }
  const handleProductInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

 
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit product' : 'add product'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={handleProductInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='brand'
            value={brand}
            handleChange={handleProductInput}
          />
          {/* location */}
          <FormRow
            type='number'
            min='0'
            max='99999999'
            name='price'
            value={price}
            handleChange={handleProductInput}
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
          />
          {/* job type */}
          <FormRow
            type="number"
            min='0'
            max='999999'
            name='quantity'
            value={quantity}
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

export default AddProduct
