import moment from 'moment'
import { FaCalendarAlt, FaRupeeSign, FaWeightHanging } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Product'
import ProductInfo from './ProductInfo'

const Product = ({
  _id,
  name,
  brand,
  quantity,
  price,
  createdAt,
  weight,
}) => {
  const { setEditProduct, deleteProduct } = useAppContext()

  let n = weight.length;
  let w = weight;
  let quantityValue;

  if(quantity===0){
    quantityValue = "sharpRed"
  }
  if(quantity>0){
    quantityValue = "red"
  }
  if(quantity>5){
    quantityValue = "orange"
  }
  if(quantity>15){
    quantityValue = "green"
  }

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{name.charAt(0)}</div>
        <div className='info'>
          <h5>{name}</h5>
          <p>{brand}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <ProductInfo icon={<FaRupeeSign />} text={`${price} Rs`} name="Price"/>
          <ProductInfo icon={<FaCalendarAlt />} text={date} />
          
          <ProductInfo icon={<FaWeightHanging />} hide={(w.substring(0,n-3) === '')} text={weight} name="Weight" />
          
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-product'
              className='btn edit-btn'
              onClick={() => setEditProduct(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProduct(_id)}
            >
              Delete
            </button>
          </div>
          <div className={`status ${quantityValue}`}>{quantity} left</div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Product
