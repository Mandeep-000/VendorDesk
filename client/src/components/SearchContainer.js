import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    searchQuantity,
    searchBrand,
    searchPrice,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    quantityOptions,
    priceOptions,
  } = useAppContext();

  const { location } = useLocation();

  useEffect(() => {
    // Setup cleanup function to clear values when leaving the AddProduct page
    const clearValuesOnUnmount = () => {
      clearFilters(); // Call the function to clear form values
    };

    // Specify the dependencies for the cleanup function
    return clearValuesOnUnmount;
    // eslint-disable-next-line
  }, [location]);

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters();
  };
  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce() // eslint-disable-next-line
  , []);

  
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by type */}
          <FormRow
            type="text"
            labelText='brand'
            name='searchBrand'
            value={searchBrand}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='quantity'
            name='searchQuantity'
            value={searchQuantity}
            handleChange={handleSearch}
            list={['all', ...quantityOptions]}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='price'
            name='searchPrice'
            value={searchPrice}
            handleChange={handleSearch}
            list={['all', ...priceOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
