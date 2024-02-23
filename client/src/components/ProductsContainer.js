import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Product from './Product';
import Alert from './Alert';
import Wrapper from '../assets/wrappers/AllProductsContainer';
import PageBtnContainer from './PageBtnContainer';

const ProductsContainer = () => {
  const {
    getJobs,
    jobs,
    totalJobs,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
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
      <div className='jobs'>
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ProductsContainer;
