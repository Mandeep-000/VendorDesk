import { ProductsContainer, SearchContainer } from '../../components'
import { useAppContext } from '../../context/appContext'
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

const AllProducts = () => {

  return (
    <>
      <SearchContainer />
      <ProductsContainer />
    </>
  )
}

export default AllProducts
