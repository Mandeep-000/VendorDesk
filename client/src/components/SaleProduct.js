import { FaRupeeSign } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/SalesProduct'

const SaleProduct = ({
  _id,
  name,
  brand,
  quantity,
  price,
  createdAt,
  weight,
  index,
}) => {
  const { setEditSales, setEditPurchase } = useAppContext()


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

  // let date = moment(createdAt)
  // date = date.format('MMM Do, YYYY')
 
  return (
    <Wrapper>
        <td>{index}</td>
        <td className='info'>
          {name}
        </td>
          <td>{brand}</td>
          <td className={`status ${quantityValue}`}>{quantity}</td>
        <td>
          <div className='pri'>
            {price} <FaRupeeSign/>
            </div>
        </td>
        <td className='content'>
            <div className='actions'>
              <Link to={quantity <= 0? '': '/edit-sales'} className='btn edit-btn' onClick={() => setEditSales(_id)}>
                Sale
              </Link>
              <Link to='/edit-sales' className='btn delete-btn' onClick={() => setEditPurchase(_id)}>
                Purchase
              </Link>
            </div>
        </td>
    </Wrapper>
  );
}

export default SaleProduct
