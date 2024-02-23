import moment from 'moment'
import Wrapper from '../assets/wrappers/SalesProduct'

const SaleProduct = ({
  quantity,
  revisedStock,
  exchangeType,
  productDetails,
  createdAt,
  index,
}) => {
 

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
 
  return (
    <Wrapper>
        <td>{date}</td>
        <td className='info'>
          {productDetails.name}
        </td>
          <td>{productDetails.brand}</td>
          <td className={`status`}>{quantity}</td>
        <td>{revisedStock}</td>
        <td className='content'>
            <div className='actions'>
              {(exchangeType === 'sales')? (<button className='btn edit-btn' style={{cursor: "default"}}>
                Sold
              </button>): (<button className='btn delete-btn' style={{cursor: "default"}}>
                Purchased
              </button>)}              
            </div>
        </td>
    </Wrapper>
  );

}

export default SaleProduct
