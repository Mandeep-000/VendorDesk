import { FormRow, FormRow2, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo, useEffect } from 'react';
import moment from 'moment'

const SearchContainerOrder = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    searchQuantity,
    searchExchangeType,
    searchDateFrom,
    searchDateTo,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    orders,
    quantityOptions,
  } = useAppContext();

  // const { location } = useLocation();
  
  // useEffect(() => {
  //   // Setup cleanup function to clear values when leaving the AddProduct page
  //   const clearValuesOnUnmount = () => {
  //     clearFilters(); // Call the function to clear form values
  //   };

  //   // Specify the dependencies for the cleanup function
  //   return clearValuesOnUnmount;
  // }, [location]);

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
  const optimizedDebounce = useMemo(() => debounce(), []);

  
  // const [minDate, setMinDate] = useState('');
  // const [maxDate, setMaxDate] = useState('');
  
  // const allOrders = orders;
  // useEffect(() => {
  //   // Find the minimum date
  //   const min = moment.min(allOrders.map(order => moment(order.createdAt)));
  //   setMinDate(min.format('YYYY-MM-DD'));

  //   // Find the maximum date
  //   const max = moment.max(allOrders.map(order => moment(order.createdAt)));
  //   setMaxDate(max.format('YYYY-MM-DD'));

  // }, []);

  const filteredOptions = quantityOptions.filter(option => option !== 'out of stock');


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
          <FormRowSelect
            type="text"
            labelText='Exchange Type'
            name='searchExchangeType'
            value={searchExchangeType}
            handleChange={handleSearch}
            list={['all', 'sold', 'purchased']}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='quantity'
            name='searchQuantity'
            value={searchQuantity}
            handleChange={handleSearch}
            list={['all', ...filteredOptions]}
          />
          {/* search by status */}
          <FormRow2
            type="date"
            labelText='date'
            nameFrom='searchDateFrom'
            valueFrom={searchDateFrom}
            nameTo='searchDateTo'
            valueTo={searchDateTo}
            // min={minDate.toString()}
            // max={maxDate.toString()}
            handleChange={handleSearch}
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

export default SearchContainerOrder;
