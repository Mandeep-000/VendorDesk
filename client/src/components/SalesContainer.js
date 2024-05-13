import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/SalesContainer';
import PageBtnContainer from './PageBtnContainer';
import SaleProduct from './SaleProduct';

const SalesContainer = () => {
  const {
    isLoading,
    page,
    search,
    sort,

    totalProducts,
    getProducts,
    products,
    searchBrand,
    searchQuantity,
    searchPrice,

    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [page, search, searchBrand, searchPrice, searchQuantity, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No products to display...</h2>
      </Wrapper>
    );
  }

  
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalProducts} product{products.length > 1 && 's'} found
      </h5>
      <table className='jobs'>
        <tr className='header'>
          <th>Sr. No.</th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
        
        {products.map((product, index) => (
          <SaleProduct key={product._id} index={index + 1} {...product} />
        ))}
      </table>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default SalesContainer;
